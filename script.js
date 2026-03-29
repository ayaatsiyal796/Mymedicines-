// ---------- MEDICINES DATABASE ----------
const medicinesDB = [
    { id:1, name:"Paracetamol 500mg", category:"Pain Relief", price:"Rs. 120", description:"Effective for fever and mild to moderate pain. Reduces headache, toothache, and body aches.", imageIcon:"fas fa-capsules" },
    { id:2, name:"Ibuprofen 400mg", category:"Anti-inflammatory", price:"Rs. 250", description:"NSAID used for pain, inflammation, fever. Helpful in arthritis, muscle pain.", imageIcon:"fas fa-tablets" },
    { id:3, name:"Amoxicillin 500mg", category:"Antibiotics", price:"Rs. 380", description:"Broad-spectrum antibiotic for bacterial infections like tonsillitis, bronchitis.", imageIcon:"fas fa-pills" },
    { id:4, name:"Azithromycin 250mg", category:"Antibiotics", price:"Rs. 420", description:"Treats respiratory infections, ear infections, and skin infections.", imageIcon:"fas fa-capsules" },
    { id:5, name:"Omeprazole 20mg", category:"Stomach Care", price:"Rs. 210", description:"Proton pump inhibitor reduces stomach acid, treats GERD, ulcers.", imageIcon:"fas fa-stethoscope" },
    { id:6, name:"Cetirizine 10mg", category:"Allergy", price:"Rs. 85", description:"Antihistamine relieves allergy symptoms like sneezing, runny nose.", imageIcon:"fas fa-allergies" },
    { id:7, name:"Metformin 500mg", category:"Diabetes", price:"Rs. 150", description:"Controls high blood sugar in type 2 diabetes patients.", imageIcon:"fas fa-tint" },
    { id:8, name:"Vitamin C 1000mg", category:"Vitamins", price:"Rs. 320", description:"Boosts immunity, antioxidant support, helps collagen formation.", imageIcon:"fas fa-apple-alt" }
];

// Categories list
const categoriesList = ["Pain Relief","Anti-inflammatory","Antibiotics","Stomach Care","Allergy","Diabetes","Vitamins"];

// Blog posts
const blogPosts = [
    { title:"5 Immunity Boosters for Monsoon", excerpt:"Natural tips to stay healthy during rainy season. Include Vitamin C and zinc.", date:"Mar 12, 2025", icon:"fas fa-umbrella" },
    { title:"Understanding Antibiotic Resistance", excerpt:"Why overuse of antibiotics is dangerous. Learn safe practices.", date:"Feb 28, 2025", icon:"fas fa-bacteria" },
    { title:"Managing Diabetes with Diet", excerpt:"Expert diet plan to keep blood sugar in control naturally.", date:"Feb 10, 2025", icon:"fas fa-apple-alt" },
    { title:"First Aid Essentials at Home", excerpt:"Must-have medicines and supplies for every household.", date:"Jan 22, 2025", icon:"fas fa-medkit" },
    { title:"Mental Health Awareness", excerpt:"Stress management tips and when to seek help.", date:"Jan 05, 2025", icon:"fas fa-brain" }
];

// Render Medicines Page
function renderMedicinesPage(medArray = medicinesDB) {
    const container = document.getElementById("medicines-list-container");
    if(!container) return;
    container.innerHTML = "";
    medArray.forEach(med => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <i class="${med.imageIcon} fa-2x"></i>
            <h3>${med.name}</h3>
            <p class="medicine-price">${med.price}</p>
            <p>${med.description.substring(0, 70)}...</p>
            <button class="detail-link view-detail" data-id="${med.id}">View Details →</button>
        `;
        container.appendChild(card);
    });
    
    // attach detail modal events
    document.querySelectorAll('.view-detail').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.getAttribute('data-id'));
            const med = medicinesDB.find(m => m.id === id);
            if(med) showMedicineModal(med);
        });
    });
}

// Show Medicine Modal
function showMedicineModal(med) {
    const modal = document.getElementById("medicineModal");
    document.getElementById("modalTitle").innerText = med.name;
    document.getElementById("modalDesc").innerHTML = `${med.description} <br><strong>Category:</strong> ${med.category}`;
    document.getElementById("modalPrice").innerHTML = `<strong>Price:</strong> ${med.price}`;
    modal.style.display = "flex";
    
    const closeModal = () => { modal.style.display = "none"; };
    document.getElementById("closeModal").onclick = closeModal;
    document.getElementById("modalCloseBtn").onclick = closeModal;
    window.onclick = function(e) { if(e.target === modal) closeModal(); };
}

// Render Categories Page
function renderCategories() {
    const container = document.getElementById("category-grid");
    if(!container) return;
    container.innerHTML = "";
    categoriesList.forEach(cat => {
        const count = medicinesDB.filter(m => m.category === cat).length;
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <i class="fas fa-folder-open fa-2x"></i>
            <h3>${cat}</h3>
            <p>${count} medicines available</p>
            <button class="btn-outline btn view-cat-meds" style="padding:6px 12px;" data-cat="${cat}">Browse ${cat}</button>
        `;
        container.appendChild(card);
    });
    
    // add click to filter medicines in a preview
    document.querySelectorAll('.view-cat-meds').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = btn.getAttribute('data-cat');
            const filtered = medicinesDB.filter(m => m.category === category);
            const previewDiv = document.getElementById("category-meds-preview");
            previewDiv.innerHTML = `<div style="width:100%;"><strong>📌 Medicines in "${category}":</strong><div style="display:flex; flex-wrap:wrap; gap:12px; margin-top:12px;">`;
            if(filtered.length === 0) previewDiv.innerHTML += `<p>No medicines found</p>`;
            filtered.forEach(m => {
                previewDiv.innerHTML += `<div style="background:#fff; border-radius:20px; padding:8px 16px; box-shadow:0 2px 5px rgba(0,0,0,0.05);"><i class="${m.imageIcon}"></i> ${m.name} - ${m.price}</div>`;
            });
            previewDiv.innerHTML += `</div></div>`;
            previewDiv.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

// Render Blog Page
function renderBlog() {
    const blogGrid = document.getElementById("blog-grid");
    if(!blogGrid) return;
    blogGrid.innerHTML = "";
    blogPosts.forEach(post => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <i class="${post.icon} fa-2x"></i>
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <small><i class="far fa-calendar-alt"></i> ${post.date}</small>
            <br><a href="#" style="display:inline-block; margin-top:10px; color:#1c6e6f;">Read more →</a>
        `;
        blogGrid.appendChild(card);
    });
}

// Global Search Function
function performGlobalSearch() {
    const query = document.getElementById("globalSearchInput").value.trim().toLowerCase();
    if(query === "") {
        const activePageId = document.querySelector(".page.active-page")?.id;
        if(activePageId === "medicines-page") renderMedicinesPage(medicinesDB);
        else showSearchToast("Please enter a medicine name", "#fff3cd");
        return;
    }
    const filtered = medicinesDB.filter(med => med.name.toLowerCase().includes(query) || med.category.toLowerCase().includes(query));
    navigateToPage("medicines");
    renderMedicinesPage(filtered);
    
    const msgDiv = document.createElement("div");
    msgDiv.className = "search-message";
    msgDiv.innerHTML = `<i class="fas fa-search"></i> Showing ${filtered.length} result(s) for "${query}". <button id="clearSearchBtn" style="background:transparent; border:none; color:#1c6e6f; font-weight:bold; margin-left:12px; cursor:pointer;">Clear</button>`;
    const medContainer = document.getElementById("medicines-list-container");
    const existingMsg = document.querySelector(".search-message");
    if(existingMsg) existingMsg.remove();
    if(medContainer) medContainer.parentNode.insertBefore(msgDiv, medContainer);
    
    document.getElementById("clearSearchBtn")?.addEventListener("click",()=>{
        document.getElementById("globalSearchInput").value = "";
        renderMedicinesPage(medicinesDB);
        const msg = document.querySelector(".search-message");
        if(msg) msg.remove();
    });
}

function showSearchToast(text, bg) {
    const toast = document.createElement("div");
    toast.innerText = text;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.left = "20px";
    toast.style.background = bg;
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "40px";
    toast.style.zIndex = "999";
    toast.style.boxShadow = "0 2px 12px rgba(0,0,0,0.2)";
    document.body.appendChild(toast);
    setTimeout(()=> toast.remove(), 2000);
}

// Navigation between pages
function navigateToPage(pageId) {
    document.querySelectorAll(".page").forEach(page => page.classList.remove("active-page"));
    const targetPage = document.getElementById(`${pageId}-page`);
    if(targetPage) targetPage.classList.add("active-page");
    
    // update active link style
    document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
    const activeLink = Array.from(document.querySelectorAll(".nav-link")).find(link => link.getAttribute("data-page") === pageId);
    if(activeLink) activeLink.classList.add("active");
    
    // re-render dynamic content if needed
    if(pageId === "medicines") renderMedicinesPage(medicinesDB);
    if(pageId === "categories") { renderCategories(); document.getElementById("category-meds-preview").innerHTML = ""; }
    if(pageId === "blog") renderBlog();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// Event Listeners
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = link.getAttribute("data-page");
        navigateToPage(page);
    });
});

document.querySelectorAll("[data-page-nav]").forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        const page = btn.getAttribute("data-page-nav");
        navigateToPage(page);
    });
});

document.getElementById("globalSearchBtn")?.addEventListener("click", performGlobalSearch);
document.getElementById("globalSearchInput")?.addEventListener("keypress", (e) => { if(e.key === "Enter") performGlobalSearch(); });

// Initial Load
window.addEventListener("DOMContentLoaded", () => {
    renderMedicinesPage(medicinesDB);
    renderCategories();
    renderBlog();
    
    // set active home link properly
    document.querySelectorAll(".nav-link").forEach(l=>l.classList.remove("active"));
    const homeLink = document.querySelector(".nav-link[data-page='home']");
    if(homeLink) homeLink.classList.add("active");
    
    // ensure home page visible
    document.querySelectorAll(".page").forEach(p=>p.classList.remove("active-page"));
    document.getElementById("home-page").classList.add("active-page");
});