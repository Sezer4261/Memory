/**
 * Enforces simple size limits for hand-written source files.
 *
 * Asset formats are intentionally excluded: they are not maintained as source
 * code, even when their serialization is text (for example, SVG).
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const SOURCE_ROOT = path.resolve('src');
const MAX_FILE_LINES = 400;
const MAX_FUNCTION_LINES = 14;
const HAND_WRITTEN_EXTENSIONS = new Set([
  '.css',
  '.html',
  '.js',
  '.jsx',
  '.scss',
  '.ts',
  '.tsx',
]);
const TYPESCRIPT_EXTENSIONS = new Set(['.ts', '.tsx']);

async function collectHandWrittenFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectHandWrittenFiles(entryPath)));
    } else if (
      entry.isFile() &&
      HAND_WRITTEN_EXTENSIONS.has(path.extname(entry.name))
    ) {
      files.push(entryPath);
    }
  }

  return files;
}

function countPhysicalLines(text) {
  if (text.length === 0) {
    return 0;
  }

  const lineBreaks = text.match(/\r\n|\r|\n/g)?.length ?? 0;
  return lineBreaks + (/(?:\r\n|\r|\n)$/.test(text) ? 0 : 1);
}

function isCheckedFunction(node) {
  return (
    ts.isFunctionDeclaration(node) ||
    ts.isFunctionExpression(node) ||
    ts.isArrowFunction(node) ||
    ts.isMethodDeclaration(node) ||
    ts.isConstructorDeclaration(node) ||
    ts.isGetAccessorDeclaration(node) ||
    ts.isSetAccessorDeclaration(node)
  );
}

function describeFunction(node, sourceFile) {
  if (ts.isConstructorDeclaration(node)) {
    return 'constructor';
  }

  if (node.name) {
    return node.name.getText(sourceFile);
  }

  if (
    (ts.isArrowFunction(node) || ts.isFunctionExpression(node)) &&
    ts.isVariableDeclaration(node.parent)
  ) {
    return node.parent.name.getText(sourceFile);
  }

  return '<anonymous>';
}

function findFunctionViolations(filePath, text) {
  const scriptKind = filePath.endsWith('.tsx')
    ? ts.ScriptKind.TSX
    : ts.ScriptKind.TS;
  const sourceFile = ts.createSourceFile(
    filePath,
    text,
    ts.ScriptTarget.Latest,
    true,
    scriptKind,
  );
  const violations = [];

  function visit(node) {
    if (isCheckedFunction(node)) {
      const startLine =
        sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line +
        1;
      const endLine =
        sourceFile.getLineAndCharacterOfPosition(node.getEnd()).line + 1;
      const lineCount = endLine - startLine + 1;

      if (lineCount > MAX_FUNCTION_LINES) {
        violations.push({
          startLine,
          message: `${describeFunction(node, sourceFile)} spans ${lineCount} lines (max ${MAX_FUNCTION_LINES})`,
        });
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return violations;
}

function relativePath(filePath) {
  return path.relative(process.cwd(), filePath).split(path.sep).join('/');
}

const files = (await collectHandWrittenFiles(SOURCE_ROOT)).sort();
const violations = [];

for (const filePath of files) {
  const text = await readFile(filePath, 'utf8');
  const lineCount = countPhysicalLines(text);
  const displayPath = relativePath(filePath);

  if (lineCount > MAX_FILE_LINES) {
    violations.push(
      `${displayPath}: ${lineCount} lines (max ${MAX_FILE_LINES})`,
    );
  }

  if (TYPESCRIPT_EXTENSIONS.has(path.extname(filePath))) {
    for (const violation of findFunctionViolations(filePath, text)) {
      violations.push(
        `${displayPath}:${violation.startLine}: ${violation.message}`,
      );
    }
  }
}

if (violations.length > 0) {
  console.error('Structural check failed:');
  console.error(violations.map((violation) => `- ${violation}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log(`Structural check passed (${files.length} files checked).`);
}
