// scripts/generate-placeholder-pdf.mjs
// One-off generator for the Download Catalog page's placeholder PDF
// (Mohsin confirmed a placeholder is fine to ship with, 2026-09-10 --
// swap public/catalog/capriowear-catalog-placeholder.pdf for the real
// catalog once it exists). Not part of the app itself -- run manually
// with `node scripts/generate-placeholder-pdf.mjs`.
//
// Writes real PDF bytes via fs.writeFileSync rather than hand-typing the
// file through a text-editing tool: a minimal PDF's xref table records
// the exact byte offset of every object, and a text tool silently
// normalizing line endings (\n vs \r\n) would shift those offsets and
// corrupt the file. Building the string in Node and writing it with
// Buffer.from(..., "binary") keeps every byte exactly as authored.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "..", "public", "catalog", "capriowear-catalog-placeholder.pdf");

const title = "Capriowear Catalog (placeholder)";
const bodyLines = [
  "This is a placeholder catalog PDF.",
  "",
  "Capriowear -- the activewear and teamwear division of Caprio Sports,",
  "a cut-and-sew manufacturer in Sialkot, Pakistan.",
  "",
  "The real catalog will replace this file before launch.",
];

function textObjectStream() {
  const lines = [title, "", ...bodyLines];
  const commands = [`BT`, `/F1 18 Tf`, `72 720 Td`];
  lines.forEach((line, index) => {
    if (index > 0) commands.push(`0 -24 Td`);
    const escaped = line.replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
    const size = index === 0 ? 18 : 12;
    if (index === 1) commands.push(`/F1 12 Tf`);
    commands.push(`(${escaped}) Tj`);
  });
  commands.push(`ET`);
  return commands.join("\n");
}

const contentStream = textObjectStream();

const objects = [
  `<< /Type /Catalog /Pages 2 0 R >>`,
  `<< /Type /Pages /Kids [3 0 R] /Count 1 >>`,
  `<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>`,
  `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`,
  `<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream`,
];

let pdf = "%PDF-1.4\n";
const offsets = [0];
objects.forEach((obj, index) => {
  offsets.push(pdf.length);
  pdf += `${index + 1} 0 obj\n${obj}\nendobj\n`;
});

const xrefStart = pdf.length;
let xref = `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (let i = 1; i <= objects.length; i++) {
  xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}
pdf += xref;
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, Buffer.from(pdf, "binary"));
console.log(`Wrote ${outPath} (${Buffer.byteLength(pdf, "binary")} bytes)`);
