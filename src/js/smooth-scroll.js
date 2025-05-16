document.addEventListener('DOMContentLoaded', () => {
    function getHeaderOffset() {
        const header = document.getElementById('site-header');
        return header ? header.offsetHeight : 0;
    }

    function smoothScrollToElement(targetId) {
        const target = document.getElementById(targetId);
        if (!target) return;

        const offset = getHeaderOffset();
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
        });
    }

    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            const [path, hash] = href.split('#');


            const isSamePage = !path || path === window.location.pathname.split('/').pop();

            if (isSamePage && hash) {
                e.preventDefault();
                smoothScrollToElement(hash);
                history.pushState(null, '', `#${hash}`); 
            }
        });
    });

    const hash = window.location.hash;
    if (hash) {
        const targetId = hash.substring(1);
        const interval = setInterval(() => {
            const el = document.getElementById(targetId);
            if (el) {
                smoothScrollToElement(targetId);
                clearInterval(interval);
            }
        }, 100);
    }
});
