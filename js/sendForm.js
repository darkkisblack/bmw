document.addEventListener('DOMContentLoaded', () => {
  const server = 'https://jsonplaceholder.typicode.com/posts';

  const sendData = (data, cb, falseCB) => {
    const request = new XMLHttpRequest();
    request.open('POST', server);
    request.addEventListener('readystatechange', () => {
      if (request.readyState !== 4) return;
      if (request.status === 200 || request.status === 201) {
        const response = JSON.parse(request.responseText);
        cb(response.id);
      } else {
        falseCB(request.status);
        throw new Error(request.status);
      }
    });
    request.send(data);
  };

  const dataTest = {
    name: 'Роман',
    tel: '+1231242',
  };

  const formElems = document.querySelectorAll('.form');

  const formHandler = (form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = {};
      for (const { name, value } of form.elements) {
        if (name) {
          if (!value.trim()) {
            alert('Пожалуйста, введите данные!');
            return;
          } else {
            data[name] = value;
          }
        }
      }
      const smallElem = document.createElement('small');
      sendData(
        JSON.stringify(data),
        (id) => {
          const btn = form.querySelector('button[type="submit"]');
          const checkDisabled = () => {
            if (btn.disabled) {
              btn.style.color = '#333';
              btn.style.background = '#666';
              btn.style.pointerEvents = 'none';
            } else {
              btn.style.color = '';
              btn.style.background = '';
              btn.style.pointerEvents = 'initial';
            }
          };
          btn.disabled = true;
          checkDisabled();
          smallElem.textContent = 'Ваша заявка № ' + id + ' успешно отправлена!';
          smallElem.style.color = 'white';
          const setEnable = () => {
            btn.disabled = false;
            smallElem.textContent = '';
            checkDisabled();
          };
          setTimeout(setEnable, 5000);
          form.append(smallElem);
        },
        (err) => {
          smallElem.textContent = 'Технические неполадки, код ошибки: ' + err + ". Ваши данные не отправлены!";
          smallElem.style.color = 'red';
          form.append(smallElem);
        },
      );
      form.reset();
    });
  };

  formElems.forEach(formHandler);
});
