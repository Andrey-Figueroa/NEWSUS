document.addEventListener("DOMContentLoaded", () => {
    // Intersection Observer for fade-in up animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add slight delay for staggered effect
                setTimeout(() => {
                    entry.target.classList.add("show");
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    });

    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach((el) => observer.observe(el));

    // Modal Logic
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const closeBtn = document.querySelector(".close-modal");
    const promoImages = document.querySelectorAll(".promo-image");

    if (modal && modalImg && closeBtn) {
        // Open modal on image click
        promoImages.forEach(imgDiv => {
            imgDiv.style.cursor = "pointer"; // Add pointer cursor
            imgDiv.addEventListener("click", () => {
                // Extract URL from background-image
                const bgImage = imgDiv.style.backgroundImage;
                const url = bgImage.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
                if (url && url !== "none") {
                    modalImg.src = url;
                    modal.classList.add("show-modal");
                }
            });
        });

        // Close modal on X click
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("show-modal");
            setTimeout(() => modalImg.src = "", 300); // clear after animation
        });

        // Close modal on outside click
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("show-modal");
                setTimeout(() => modalImg.src = "", 300);
            }
        });
    }
});
