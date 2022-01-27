import React, { memo } from 'react';
import readXlsxFile from 'read-excel-file';

export default function UploadFileModal(props) {
  function readFile() {
    const map = {
      MAWB: 'MAWB',
      'Container number': 'containerNumber',
      'Tracking number': 'trackingNumber',
    };
    const input = document.getElementById('xlsxInput');
    input.addEventListener('change', () => {
      props.setFiles(input.files || []);
      readXlsxFile(input.files[0], { sheet: 2 }).then(rows => {
        // console.log('files', rows);
        rows.forEach((row, index) => {
          if (index == 0) {
          }
          console.log('data', row);
          console.log('index', index);
          if (index >= 2) {
          }
        });
      });
    });
  }

  React.useEffect(() => {
    readFile();
  }, []);

  return <React.Fragment />;
}
