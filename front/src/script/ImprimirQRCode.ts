export const imprimirBlob = (qrData: { type: "Buffer"; data: number[] }) => {
  // Criar um Blob a partir do ArrayBuffer
  const uint8Array = new Uint8Array(qrData.data);

  // Criar um Blob a partir do Uint8Array
  const blob = new Blob([uint8Array], { type: "image/png" });

  // Criar URL temporária para exibição
  const imageUrl = URL.createObjectURL(blob);

  // Abrir uma nova janela
  const printWindow = window.open("", "_blank");

  if (printWindow) {
      // Criar um HTML básico com a imagem
      printWindow.document.write(`
          <html>
              <head>
                  <title>Imprimir QR Code</title>
                  <style>
                      body { text-align: center; margin: 0; padding: 20px; }
                      img { max-width: 100%; height: auto; }
                  </style>
              </head>
              <body>
                  <img src="${imageUrl}" alt="QR Code" />
                  <script>
                      window.onload = function() {
                          window.print();
                      };
                  </script>
              </body>
          </html>
      `);

      printWindow.document.close(); // Finaliza a escrita do documento
  }
};



export const exibirQRCode = (qrData: { type: "Buffer"; data: number[] }) => {
  // Converter array de números para Uint8Array
  const uint8Array = new Uint8Array(qrData.data);

  // Criar um Blob a partir do Uint8Array
  const blob = new Blob([uint8Array], { type: "image/png" });

  // Criar URL temporária para exibição
  const imageUrl = URL.createObjectURL(blob);

  // Atualizar o estado com a URL gerada
  return imageUrl;
};