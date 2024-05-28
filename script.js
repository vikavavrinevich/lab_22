const products = [
    { id: 1, name: 'Смартфон', category: 'smartphones', description: 'Сучасний смартфон', price: 300, date: '2023-05-01' },
    { id: 2, name: 'Футболка', category: 'clothing', description: 'Стильна футболка', price: 20, date: '2023-04-15' },
    { id: 3, name: 'Книга', category: 'books', description: 'Цікава книга', price: 15, date: '2023-03-10' },
    { id: 4, name: 'Ноутбук', category: 'electronics', description: 'Потужний ноутбук', price: 1000, date: '2023-02-20' },
    { id: 5, name: 'Штани', category: 'clothing', description: 'Зручні штани', price: 40, date: '2023-01-05' },
    { id: 6, name: 'Кухонний набір', category: 'home', description: 'Повний кухонний набір', price: 150, date: '2022-12-25' },
    { id: 7, name: 'Ноутбук-УКР', category: 'electronics', description: 'Потужний ноутбук Укр', price: 1200, date: '2024-02-20' },
    { id: 8, name: 'Шафи', category: 'home', description: 'Шафи', price: 1140, date: '2024-03-25' },
    { id: 9, name: 'iPhone', category: 'smartphones', description: 'iPhone', price: 2150, date: '2022-12-25' },
];

document.addEventListener('DOMContentLoaded', () => {
    const categorySelect = document.getElementById('category');
    const searchInput = document.getElementById('search');
    const sortSelect = document.getElementById('sort');
    const productList = document.getElementById('product-list');

    function renderProducts(filteredProducts) {
        productList.innerHTML = '';
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>Ціна: ${product.price} грн</p>
                <p>Дата додавання: ${new Date(product.date).toLocaleDateString()}</p>
            `;
            productList.appendChild(productCard);
        });
    }

    function filterByCategory(products, category) {
        return new Promise((resolve) => {
            let filteredProducts = category ? products.filter(product => product.category === category) : products;
            resolve(filteredProducts);
        });
    }

    function searchProducts(products, searchTerm) {
        return new Promise((resolve) => {
            let filteredProducts = searchTerm ?
                products.filter(product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase())
                ) : products;
            resolve(filteredProducts);
        });
    }

    function sortProducts(products, sortMethod) {
        return new Promise((resolve) => {
            let sortedProducts = [...products];
            switch (sortMethod) {
                case 'price-asc':
                    sortedProducts.sort((a, b) => a.price - b.price);
                    break;
                case 'price-desc':
                    sortedProducts.sort((a, b) => b.price - a.price);
                    break;
                case 'date-asc':
                    sortedProducts.sort((a, b) => new Date(a.date) - new Date(b.date));
                    break;
                case 'date-desc':
                    sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
                    break;
            }
            resolve(sortedProducts);
        });
    }

    function filterProducts() {
        const category = categorySelect.value;
        const searchTerm = searchInput.value;
        const sortMethod = sortSelect.value;

        filterByCategory(products, category)
            .then(filteredProducts => searchProducts(filteredProducts, searchTerm))
            .then(filteredProducts => sortProducts(filteredProducts, sortMethod))
            .then(filteredProducts => renderProducts(filteredProducts));
    }

    categorySelect.addEventListener('change', filterProducts);
    searchInput.addEventListener('input', filterProducts);
    sortSelect.addEventListener('change', filterProducts);

   
    filterProducts();
});