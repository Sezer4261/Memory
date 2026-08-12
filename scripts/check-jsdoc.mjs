/**
 * Enforces the project's minimum JSDoc coverage for hand-written TypeScript.
 *
 * The check intentionally uses the TypeScript parser instead of text matching
 * for declarations, so modifiers, overloads, and TSX syntax are handled
 * consistently with the compiler.
 */
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const SOURCE_ROOT = path.resolve('src');
const TYPESCRIPT_EXTENSIONS = new Set(['.ts', '.tsx']);
const EXCLUDED_FILES = new Set(['vite-env.d.ts']);
const GENERATED_DIRECTORIES = new Set(['generated', '__generated__']);
const GENERATED_FILE_PATTERN = /(?:^|[._-])(?:gen|generated)\.tsx?$/i;
const GENERATED_MARKER_PATTERN =
  /\b(?:@generated|auto-generated|generated file|code generated)\b/i;

/**
 * Recursively collects TypeScript sources in a deterministic order.
 */
async function collectSourceFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectSourceFiles(entryPath)));
    } else if (
      entry.isFile() &&
      TYPESCRIPT_EXTENSIONS.has(path.extname(entry.name)) &&
      !EXCLUDED_FILES.has(entry.name)
    ) {
      files.push(entryPath);
    }
  }

  return files.sort();
}

/**
 * Returns the leading comment-only portion of a source file.
 */
function getHeaderComments(text) {
  const match = text.match(
    /^(?:\uFEFF)?\s*(?:(?:\/\/[^\r\n]*(?:\r?\n|$))|(?:\/\*[\s\S]*?\*\/)\s*)+/,
  );
  return match?.[0] ?? '';
}

/**
 * Recognizes conventional generated paths, suffixes, and header markers.
 */
function isGeneratedSource(filePath, text) {
  const relativeSegments = path
    .relative(SOURCE_ROOT, filePath)
    .split(path.sep)
    .map((segment) => segment.toLowerCase());

  return (
    relativeSegments.some((segment) => GENERATED_DIRECTORIES.has(segment)) ||
    GENERATED_FILE_PATTERN.test(path.basename(filePath)) ||
    GENERATED_MARKER_PATTERN.test(getHeaderComments(text))
  );
}

/**
 * A file-level JSDoc block must be the first non-whitespace content.
 */
function hasFileJSDoc(text) {
  return /^(?:\uFEFF)?\s*\/\*\*[\s\S]*?\*\//.test(text);
}

function hasModifier(node, kind) {
  return (
    ts.canHaveModifiers(node) &&
    (ts.getModifiers(node)?.some((modifier) => modifier.kind === kind) ?? false)
  );
}

function hasJSDoc(node) {
  return ts
    .getJSDocCommentsAndTags(node)
    .some((commentOrTag) => ts.isJSDoc(commentOrTag));
}

function isDocumentedExport(statement) {
  return (
    hasModifier(statement, ts.SyntaxKind.ExportKeyword) &&
    (ts.isFunctionDeclaration(statement) ||
      ts.isClassDeclaration(statement) ||
      ts.isInterfaceDeclaration(statement) ||
      ts.isTypeAliasDeclaration(statement) ||
      ts.isEnumDeclaration(statement) ||
      ts.isVariableStatement(statement))
  );
}

function describeExport(statement, sourceFile) {
  if (ts.isVariableStatement(statement)) {
    const names = statement.declarationList.declarations
      .map((declaration) => declaration.name.getText(sourceFile))
      .join(', ');
    return `exported variable statement (${names})`;
  }

  const kind = ts.isFunctionDeclaration(statement)
    ? 'function'
    : ts.isClassDeclaration(statement)
      ? 'class'
      : ts.isInterfaceDeclaration(statement)
        ? 'interface'
        : ts.isTypeAliasDeclaration(statement)
          ? 'type alias'
          : 'enum';
  const name = statement.name?.getText(sourceFile) ?? 'default export';
  return `exported ${kind} ${name}`;
}

function isPublicMethod(member) {
  return (
    ts.isMethodDeclaration(member) &&
    !ts.isPrivateIdentifier(member.name) &&
    !hasModifier(member, ts.SyntaxKind.PrivateKeyword) &&
    !hasModifier(member, ts.SyntaxKind.ProtectedKeyword)
  );
}

function memberName(member, sourceFile) {
  if (ts.isConstructorDeclaration(member)) {
    return 'constructor';
  }
  return `public method ${member.name.getText(sourceFile)}`;
}

function lineOf(node, sourceFile) {
  return (
    sourceFile.getLineAndCharacterOfPosition(node.getStart(sourceFile)).line + 1
  );
}

/**
 * Finds missing declaration and class-member documentation in one AST.
 */
function findDeclarationViolations(filePath, text) {
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

  for (const statement of sourceFile.statements) {
    if (isDocumentedExport(statement) && !hasJSDoc(statement)) {
      violations.push({
        line: lineOf(statement, sourceFile),
        message: `missing JSDoc for ${describeExport(statement, sourceFile)}`,
      });
    }
  }

  function visit(node) {
    if (ts.isClassDeclaration(node) || ts.isClassExpression(node)) {
      for (const member of node.members) {
        if (
          (ts.isConstructorDeclaration(member) || isPublicMethod(member)) &&
          !hasJSDoc(member)
        ) {
          violations.push({
            line: lineOf(member, sourceFile),
            message: `missing JSDoc for ${memberName(member, sourceFile)}`,
          });
        }
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

const candidates = await collectSourceFiles(SOURCE_ROOT);
const checkedFiles = [];
const violations = [];

for (const filePath of candidates) {
  const text = await readFile(filePath, 'utf8');

  if (isGeneratedSource(filePath, text)) {
    continue;
  }

  checkedFiles.push(filePath);
  const displayPath = relativePath(filePath);

  if (!hasFileJSDoc(text)) {
    violations.push(`${displayPath}:1: missing leading file-level JSDoc block`);
  }

  for (const violation of findDeclarationViolations(filePath, text)) {
    violations.push(
      `${displayPath}:${violation.line}: ${violation.message}`,
    );
  }
}

if (violations.length > 0) {
  console.error('JSDoc coverage check failed:');
  console.error(violations.map((violation) => `- ${violation}`).join('\n'));
  console.error(
    `Found ${violations.length} violation(s) in ${checkedFiles.length} checked file(s).`,
  );
  process.exitCode = 1;
} else {
  console.log(
    `JSDoc coverage check passed (${checkedFiles.length} files checked).`,
  );
}
