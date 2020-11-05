const addFileBtn = document.querySelector('#file-adder-cont button');
const fileCardsCont = document.getElementById('file-cards-cont');
const uploadBtn = document.querySelector('#upload-btn-cont button');

const uploadForm = document.createElement('form');
uploadForm.action = './upload';
uploadForm.method = 'POST';
uploadForm.enctype = 'multipart/form-data';
uploadForm.style.display = 'none';

const maxFiles = 10;
let filesCount = 0;

const resetFileBtns = () => {
  filesCount === maxFiles
    ? addFileBtn.setAttribute('disabled', true)
    : addFileBtn.removeAttribute('disabled');

  filesCount === 0
    ? uploadBtn.setAttribute('disabled', true)
    : uploadBtn.removeAttribute('disabled');
};

const addFile = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';

  fileInput.name = `file-${filesCount}`;
  fileInput.addEventListener('change', () => handleFileInputChange(fileInput));

  uploadForm.appendChild(fileInput);

  fileInput.click();
};

const handleFileInputChange = (fileInput) => {
  if (fileInput.files.length === 0) {
    return;
  }

  const file = fileInput.files.item(0);

  const fileCard = document.createElement('div');
  fileCard.className = 'file-card';

  fileCardsCont.appendChild(fileCard);

  const fileCard_txt = document.createElement('span');
  fileCard_txt.className = 'txt';
  fileCard_txt.innerText = file.name;

  fileCard.appendChild(fileCard_txt);

  const fileCard_delBtn = document.createElement('button');
  fileCard_delBtn.className = 'del-btn';
  fileCard_delBtn.innerHTML = '&times;';
  fileCard_delBtn.addEventListener('click', () =>
    removeFile(fileInput, fileCard)
  );

  fileCard.appendChild(fileCard_delBtn);

  filesCount++;
  resetFileBtns();
};

const removeFile = (fileInput, fileCard) => {
  uploadForm.removeChild(fileInput);
  fileCardsCont.removeChild(fileCard);

  filesCount--;
  resetFileBtns();
};

const uploadFiles = () => {
  document.body.appendChild(uploadForm);
  uploadForm.submit();
};

addFileBtn.addEventListener('click', addFile);
uploadBtn.addEventListener('click', uploadFiles);
resetFileBtns();
