
function fixCollectionLink () {
    const link = document.querySelector('aside span[title="Коллекция"]')?.closest('a');

    if (link && !link.dataset.fixed) {
        link.setAttribute('href', '/collection');

        link.addEventListener('click', e => {
            e.stopImmediatePropagation();
            
            window.location.href = '/collection';
        })

        link.dataset.fixed = 'true';
    }
}

function fixScrollBar () {
    const collectionPage = document.querySelector('[class*="CollectionPage_root"]');
    const playlistPage = document.querySelector('[class*="PlaylistPage_wrapper"]');

    if (collectionPage && !collectionPage.dataset?.fixScroll) {
        onScroll(collectionPage);
    }
    if (playlistPage && !playlistPage.dataset?.fixScroll) {
        onScroll(playlistPage);
    }
    
    if (document.body.dataset.scrollLocked) {
        document.body.removeAttribute('data-scroll-locked');
    }
}

function onScroll (page) {
    if (page && !page.dataset.fixScroll) {
        page.addEventListener('wheel', e => {
            e.stopImmediatePropagation();
        }, true);

        page.dataset.fixScroll = 'true';
    }
}

function removeAddBlocks () {
    const adds = document.querySelectorAll('[data-floating-ui-portal]');

    const topAdd = document.querySelector('[class^="TopAdvertBanner_root"]');

    const sideAdd = document.querySelector('[class^="SideAdvertBanner_root"]');

    if (topAdd) {
        topAdd.remove();
    } 
    
    if (sideAdd) {
        sideAdd.remove();
    }
    
    adds.forEach(add => {
        add.remove();
    })
}

fixCollectionLink();

const observer = new MutationObserver(() => {
    fixCollectionLink();
    removeAddBlocks();
    fixScrollBar();
})

observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,    
    attributeFilter: ['data-scroll-locked']
})