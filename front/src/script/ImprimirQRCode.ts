import printJS from 'print-js';

export const imprimirBlob = (qrData: Blob) => {
  const imageUrl = URL.createObjectURL(qrData);

  printJS({
    printable: imageUrl,
    type: 'image',
    imageStyle: 'width:250px; height:250px; object-fit: contain; margin: 0 auto;',
    style: `
      @page {
        size: landscape;
        margin: 0;
      }
      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80vh;
        margin: 0;
        transform: scale(1.3);
        transform-origin: center;
        overflow: hidden; /* Adicionado para ocultar conteúdo que ultrapassa a página */
        box-sizing: border-box; /* Adicionado para calcular o tamanho corretamente */
      }
      img {
        max-width: 250px;
        max-height: 250px;
      }
    `,
    onPrintDialogClose: () => {
      URL.revokeObjectURL(imageUrl);
    },
  });
};