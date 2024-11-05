document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTableBody = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total');
    const checkoutButton = document.querySelector('.checkout-btn');

    // Function to render cart items
    function renderCartItems() {
        cartTableBody.innerHTML = ''; // Clear existing items

        let subtotal = 0;

        cart.forEach(item => {
            const row = document.createElement('tr');
            const total = item.price * item.quantity;
            subtotal += total;

            row.innerHTML = `
                <td>
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}">
                        <span>${item.name}</span>
                    </div>
                </td>
                <td>
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-name="${item.name}">
                </td>
                <td>${item.price}</td>
                <td>${total}</td>
                <td>
                    <button class="remove-btn" data-name="${item.name}">Remove</button>
                </td>
            `;
            cartTableBody.appendChild(row);
        });

        // Update summary
        subtotalElement.textContent = subtotal;
        totalElement.textContent = subtotal;
    }

    // Function to remove item from cart
    function removeFromCart(name) {
        const updatedCart = cart.filter(item => item.name !== name);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        renderCartItems();
    }

    // Event delegation for remove buttons
    cartTableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('remove-btn')) {
            const name = event.target.getAttribute('data-name');
            removeFromCart(name);
        }
    });

    // Event delegation for quantity inputs
    cartTableBody.addEventListener('change', function(event) {
        if (event.target.classList.contains('quantity-input')) {
            const name = event.target.getAttribute('data-name');
            const quantity = parseInt(event.target.value);
            const item = cart.find(item => item.name === name);
            if (item) {
                item.quantity = quantity;
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCartItems();
            }
        }
    });

    // Add event listener for the checkout button
    checkoutButton.addEventListener('click', function() {
        // Redirect to the checkout page
        window.location.href = 'checkout.html';
    });

    // Render cart items on page load
    renderCartItems();
});