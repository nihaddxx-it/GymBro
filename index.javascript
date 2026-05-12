document.addEventListener('DOMContentLoaded', () => {
  // Selektorlar: login formundakı email və password inputlarını tapır
  const emailInput = document.querySelector('.auth-page form input[type="email"], form#loginForm input[type="email"], form input[type="email"]');
  const passwordInput = document.querySelector('.auth-page form input[type="password"], form#loginForm input[type="password"], form input[type="password"]');

  // Container (login bölməsi) - fonu buraya tətbiq edəcəyik
  const authContainer = document.querySelector('.auth-page');

  // Əgər input yoxdursa səhifədə heç nə etməyək
  if (!emailInput && !passwordInput) return;

  // Helper: input-un altına sayğac elementi əlavə edir
  function attachCounter(inputEl) {
    if (!inputEl) return null;
    const counter = document.createElement('p');
    counter.className = 'char-count';
    counter.style.margin = '4px 0 12px';
    counter.style.color = '#444';
    counter.textContent = 'Simvol sayı: ' + (inputEl.value ? inputEl.value.length : 0);
    inputEl.insertAdjacentElement('afterend', counter);
    return counter;
  }

  const emailCounter = attachCounter(emailInput);
  const passwordCounter = attachCounter(passwordInput);

  // --- Yeni: fon rəngi seçici (change event) əlavə et ---
  if (authContainer) {
    const colorWrapper = document.createElement('div');
    colorWrapper.style.margin = '8px 0';

    const colorLabel = document.createElement('label');
    colorLabel.textContent = 'Login fon rəngi: ';
    colorLabel.style.marginRight = '8px';
    colorLabel.htmlFor = 'loginBgSelect';

    const loginBgSelect = document.createElement('select');
    loginBgSelect.id = 'loginBgSelect';
    loginBgSelect.innerHTML = `
      <option value="">--Seçin--</option>
      <option value="white">Ağ</option>
      <option value="#fde2e2">Qırmızı </option>
      <option value="#e8f5e9">Yaşıl </option>
      <option value="#e3f2fd">Mavi </option>
    `;
    // insert seçicini authContainer içində formun üstündə göstər
    const formEl = authContainer.querySelector('form');
    if (formEl) {
      colorWrapper.appendChild(colorLabel);
      colorWrapper.appendChild(loginBgSelect);
      formEl.parentNode.insertBefore(colorWrapper, formEl);
    } else {
      authContainer.appendChild(colorWrapper);
      colorWrapper.appendChild(colorLabel);
      colorWrapper.appendChild(loginBgSelect);
    }

    // change event: seçilən rəngi authContainer fonuna tətbiq et
    loginBgSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      authContainer.style.backgroundColor = val || '';
    });
  }
  // --- Yeni bitdi ---

  // --- Yeni əlavə: Array & DOM - idman qida məhsulları və "Əlavə et" düyməsi ---
  // Məhsullar array-i və vəziyyət indeksi
  const products = ['Whey', 'Kreatin', 'Geyner', 'Vitaminlər', 'Pre-Workout'];
  let productIndex = 0;

  // Düymə və siyahı elementlərini yarat və formun üzərinə yerləşdir
  const addProductBtn = document.createElement('button');
  addProductBtn.type = 'button';
  addProductBtn.textContent = 'Sehirli düymə';
  addProductBtn.style.margin = '8px 8px 8px 0';

  const productList = document.createElement('ul');
  productList.style.marginTop = '8px';

  // formEl əvvəlki blokda təyin olunub; əgər yoxdursa authContainer-a əlavə et
  if (typeof formEl !== 'undefined' && formEl) {
    formEl.parentNode.insertBefore(addProductBtn, formEl);
    formEl.parentNode.insertBefore(productList, formEl);
  } else if (authContainer) {
    authContainer.appendChild(addProductBtn);
    authContainer.appendChild(productList);
  }

  // Click event: növbəti məhsulu siyahıya əlavə et
  addProductBtn.addEventListener('click', () => {
    if (productIndex < products.length) {
      const li = document.createElement('li');
      li.textContent = products[productIndex];
      productList.appendChild(li);
      productIndex++;
    } else {
      alert('Bütün məhsullar əlavə olundu!');
    }
  });
  // --- Yeni əlavə bitdi ---

  // Yeniləmə funksiyası
  function updateCounter(inputEl, counterEl) {
    if (!inputEl || !counterEl) return;
    counterEl.textContent = 'Simvol sayı: ' + inputEl.value.length;
  }

  // Event dinləyicilər
  if (emailInput && emailCounter) {
    emailInput.addEventListener('input', () => updateCounter(emailInput, emailCounter));
    // ilkin dəyəri göstər
    updateCounter(emailInput, emailCounter);
  }

  if (passwordInput && passwordCounter) {
    passwordInput.addEventListener('input', () => updateCounter(passwordInput, passwordCounter));
    updateCounter(passwordInput, passwordCounter);
  }
});