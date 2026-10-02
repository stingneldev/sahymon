/* =========================================================
   Esquilook — Pix "copia e cola" (BR Code estático do Banco Central)
   Monta o texto que os apps de banco leem: chave, valor, recebedor e cidade.
   Nenhum dado sai do navegador; o QR Code é desenhado por assets/vendor/qrcode.js.
   ========================================================= */

// Campo EMV: id (2 dígitos) + tamanho (2 dígitos) + valor
const pixField = (id, value) => `${id}${String(value.length).padStart(2, "0")}${value}`;

// Os campos de texto do Pix: só letras sem acento, números e espaço
const pixText = (s, max) =>
  String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^A-Za-z0-9 ]/g, "").trim().slice(0, max);

// CRC16-CCITT (0x1021, início 0xFFFF): o verificador no fim do código
function pixCrc16(str) {
  let crc = 0xffff;
  for (let i = 0; i < str.length; i++) {
    crc ^= str.charCodeAt(i) << 8;
    for (let b = 0; b < 8; b++) crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

// { key, name, city, cents, txid } -> texto do Pix copia e cola
function pixPayload({ key, name, city, cents, txid }) {
  const account = pixField("00", "br.gov.bcb.pix") + pixField("01", String(key).trim());
  const amount = cents > 0 ? pixField("54", (cents / 100).toFixed(2)) : "";
  const body =
    pixField("00", "01") +
    pixField("26", account) +
    pixField("52", "0000") +
    pixField("53", "986") +           // real
    amount +
    pixField("58", "BR") +
    pixField("59", pixText(name, 25) || "Caixa do lanche") +
    pixField("60", pixText(city, 15).toUpperCase() || "BRASIL") +
    pixField("62", pixField("05", pixText(txid, 25).replace(/ /g, "") || "***")) +
    "6304";
  return body + pixCrc16(body);
}

// QR Code em SVG (ou "" se a biblioteca não carregou)
function pixQrSvg(payload, label) {
  if (typeof qrcode !== "function") return "";
  const qr = qrcode(0, "M");
  qr.addData(payload);
  qr.make();
  return qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true, title: label });
}
