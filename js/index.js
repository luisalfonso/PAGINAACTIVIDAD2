  // CRUD de productos usando JavaScript
  let products = []; // Arreglo de productos
  let currentIndex = null; // Para saber qué producto estamos editando

  // Captura del formulario
  const productForm = document.getElementById('productForm');
  const productContainer = document.getElementById('productContainer');
  const toggleFormButton = document.getElementById('toggleFormButton');

  // Función para alternar visibilidad del formulario
  function toggleForm() {
      if (productForm.style.display === "none") {
          productForm.style.display = "block";
          toggleFormButton.textContent = "Ocultar Formulario";
      } else {
          productForm.style.display = "none";
          toggleFormButton.textContent = "Mostrar Formulario";
      }
  }

  // Función para crear o actualizar un producto
  productForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Evitar que se recargue la página

      const title = document.getElementById('productTitle').value;
      const description = document.getElementById('productDescription').value;
      const price = document.getElementById('productPrice').value;
      const image = document.getElementById('productImage').value;

      // Si estamos editando un producto existente
      if (currentIndex !== null) {
          products[currentIndex] = { title, description, price, image };
          currentIndex = null;
      } else {
          // Crear un nuevo producto
          products.push({ title, description, price, image });
      }

      // Limpiar formulario
      productForm.reset();

      // Mostrar los productos en la página
      renderProducts();
  });

  // Función para mostrar los productos
  function renderProducts() {
      productContainer.innerHTML = ''; // Limpiar el contenedor

      products.forEach((product, index) => {
          const productCard = document.createElement('div');
          productCard.classList.add('col-md-4', 'mb-4');
          productCard.innerHTML = `
              <div class="card">
                  <img src="${product.image}" class="card-img-top" alt="Producto ${index + 1}">
                  <div class="card-body">
                      <h5 class="card-title">${product.title}</h5>
                      <p class="card-text">${product.description}</p>
                      <p class="card-text"><strong>Precio: $${product.price}</strong></p>
                      <a href="#" class="btn btn-primary" onclick="editProduct(${index})">Editar</a>
                      <a href="#" class="btn btn-success" onclick="updateProduct(${index})">Actualizar</a>
                      <a href="#" class="btn btn-danger" onclick="deleteProduct(${index})">Eliminar</a>
                  </div>
              </div>
          `;
          productContainer.appendChild(productCard);
      });
  }

  // Función para editar un producto
  function editProduct(index) {
      const product = products[index];
      document.getElementById('productTitle').value = product.title;
      document.getElementById('productDescription').value = product.description;
      document.getElementById('productPrice').value = product.price;
      document.getElementById('productImage').value = product.image;
      currentIndex = index; // Guardamos el índice del producto que estamos editando
  }

  // Función para actualizar un producto (acción después de editar)
  function updateProduct(index) {
      const product = products[index];
      const title = document.getElementById('productTitle').value;
      const description = document.getElementById('productDescription').value;
      const price = document.getElementById('productPrice').value;
      const image = document.getElementById('productImage').value;

      // Actualizamos el producto
      products[index] = { title, description, price, image };

      // Limpiar el formulario y renderizar productos
      productForm.reset();
      renderProducts();
      currentIndex = null; // Reseteamos el índice
  }

  // Función para eliminar un producto
  function deleteProduct(index) {
      products.splice(index, 1); // Eliminar el producto del array
      renderProducts(); // Actualizar la vista
  }
