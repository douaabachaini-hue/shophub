// ============================================
// Index Page - Simple Conditions JavaScript
// ============================================

// 1. Check if user is logged in and personalize greeting
function checkUserLogin() {
    const isLoggedIn = localStorage.getItem('userLoggedIn');
    const userName = localStorage.getItem('userName');
    
    if (isLoggedIn === 'true' && userName) {
        console.log(`Bienvenue, ${userName}!`);
        addWelcomeMessage(userName);
    } else {
        console.log('Utilisateur non connecté');
    }
}

// 2. Add personalized welcome message
function addWelcomeMessage(userName) {
    const header = document.querySelector('header');
    if (header) {
        const welcomeDiv = document.createElement('div');
        welcomeDiv.className = 'welcome-banner';
        welcomeDiv.innerHTML = `<p>👋 Bienvenue ${userName}! Heureux de vous revoir.</p>`;
        header.appendChild(welcomeDiv);
    }
}

// 3. Check current time and display time-based message
function displayTimeBasedMessage() {
    const hour = new Date().getHours();
    const storeSection = document.querySelector('.store-presentation');
    
    if (!storeSection) return;
    
    let message = '';
    
    if (hour >= 6 && hour < 12) {
        message = '🌅 Bon matin! Profitez de nos promotions matinales!';
    } else if (hour >= 12 && hour < 17) {
        message = '☀️ Bon après-midi! Continuez vos achats avec nous!';
    } else if (hour >= 17 && hour < 21) {
        message = '🌆 Bonsoir! Ne manquez pas nos offres du jour!';
    } else {
        message = '🌙 Bonne nuit! Revenez bientôt pour plus de promotions!';
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'time-message';
    messageDiv.style.cssText = 'background-color: #e8f4f8; padding: 10px; margin-bottom: 15px; border-radius: 5px; text-align: center;';
    messageDiv.innerHTML = `<p>${message}</p>`;
    storeSection.insertBefore(messageDiv, storeSection.firstChild);
}

// 4. Validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 5. Check if product in cart
function isProductInCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.some(item => item.id === productId);
}

// 6. Add product to cart with conditions
function addToCart(productId, productName, price) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if product already exists
    const existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
        console.log(`Quantité mise à jour pour ${productName}`);
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: 1
        });
        console.log(`${productName} ajouté au panier`);
    }
    
    // Save to localStorage with condition - max 50 items
    if (cart.length <= 50) {
        localStorage.setItem('cart', JSON.stringify(cart));
        return true;
    } else {
        console.warn('Le panier est plein! Maximum 50 articles autorisés.');
        return false;
    }
}

// 7. Get cart count
function getCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart.reduce((total, item) => total + item.quantity, 0);
}

// 8. Check user age for age-restricted products
function checkUserAge() {
    const birthYear = localStorage.getItem('birthYear');
    
    if (!birthYear) {
        console.log('Veuillez renseigner votre date de naissance');
        return false;
    }
    
    const age = new Date().getFullYear() - parseInt(birthYear);
    
    if (age >= 18) {
        console.log('Accès autorisé aux produits pour adultes');
        return true;
    } else {
        console.log('Vous ne pouvez pas accéder à ces produits');
        return false;
    }
}

// 9. Toggle navigation menu on mobile
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    
    if (navMenu) {
        const isVisible = navMenu.style.display !== 'none';
        navMenu.style.display = isVisible ? 'none' : 'block';
    }
}

// 10. Check system theme preference
function setThemeBasedOnSystemPreference() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.style.backgroundColor = '#222';
        document.body.style.color = '#fff';
        console.log('Mode sombre activé');
    } else {
        console.log('Mode clair activé');
    }
}

// 11. Check product discount eligibility
function calculateDiscount(price, isVIP = false, isBirthday = false) {
    let discount = 0;
    
    if (isVIP) {
        discount += 10; // 10% VIP discount
    }
    
    if (isBirthday) {
        discount += 5; // 5% birthday discount
    }
    
    const discountedPrice = price - (price * discount / 100);
    
    if (discount > 0) {
        console.log(`Réduction appliquée: ${discount}% - Prix: ${discountedPrice.toFixed(2)}€`);
    }
    
    return discountedPrice;
}

// 12. Check if promo code is valid
function validatePromoCode(code) {
    const validCodes = ['SUMMER20', 'WELCOME10', 'VIP15', 'NEWUSER5'];
    
    if (validCodes.includes(code.toUpperCase())) {
        console.log('Code promo valide!');
        return true;
    } else {
        console.log('Code promo invalide');
        return false;
    }
}

// 13. Check stock availability
function checkStockAvailability(productId, quantity) {
    const stock = {
        '1': 50,
        '2': 0,
        '3': 15,
        '4': 3
    };
    
    const availableStock = stock[productId] || 0;
    
    if (availableStock >= quantity) {
        console.log(`Stock disponible: ${availableStock} unités`);
        return true;
    } else if (availableStock > 0) {
        console.log(`Stock limité: seulement ${availableStock} unités disponibles`);
        return false;
    } else {
        console.log('Produit indisponible');
        return false;
    }
}

// 14. Initialize page on load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page chargée - Initialisation des fonctions');
    
    // Run all initialization functions
    checkUserLogin();
    displayTimeBasedMessage();
    setThemeBasedOnSystemPreference();
    
    // Display cart count
    const cartCount = getCartCount();
    if (cartCount > 0) {
        console.log(`Articles dans le panier: ${cartCount}`);
    }
});

// 15. Listen for storage changes (when user logs in from another tab)
window.addEventListener('storage', function(event) {
    if (event.key === 'userLoggedIn' && event.newValue === 'true') {
        console.log('L\'utilisateur s\'est connecté dans un autre onglet');
        location.reload();
    }
});
