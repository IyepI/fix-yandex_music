
function fixCollectionLink () {
    const link = document.querySelector('aside span[title="Коллекция"]')?.closest('a');

    if (link && !link.dataset.fixed) {
        link.setAttribute('href', '/collection');
        
        link.addEventListener('click', e => {
            e.preventDefault();
            e.stopImmediatePropagation();
            
            window.next.router.push('/collection');
        })

        link.dataset.fixed = 'true';
    }
}

function onScroll (page) {
    if (page && !page.dataset?.fixScroll) {
        page.addEventListener('wheel', e => {
            e.stopImmediatePropagation();
        }, true);

        page.dataset.fixScroll = 'true';
    }
}

function fixScrollBar () {
    const selectors = [
        '[class*="CollectionPage_root"]',
        '[class*="PlaylistPage_wrapper"]',
        '[class*="LandingPage_root"]',
        '[class*="CollectionPlaylistsPage_root"]',
    ].join(', ');

    document.querySelectorAll(selectors)
        .forEach(collectionPage => onScroll(collectionPage));
    
    if (document.body.dataset.scrollLocked) {
        document.body.removeAttribute('data-scroll-locked');
    }
}


function removeAddBlocks () {

    const addSelectors = [
        '[class*="TopAdvertBanner_root"]',
        '[class*="SideAdvertBanner_root"]',
    ].join(', ');

    const selectorsR = [
        '[class*="PaywallModal_root"]',
        '[class*="VideoAd_videoBlock"]',
    ].join(', ');

    document.querySelectorAll(addSelectors).forEach(add => {
        if (add) {
            add.remove();
        }
    });

    document.querySelectorAll(selectorsR)
        .forEach(add => {
            const parentBlock = add.parentElement ? add.parentElement.closest('[id^="_r_"]') : null;
            if (parentBlock) {
                parentBlock.remove();
            }
        });
}

fixCollectionLink();
removeAddBlocks();
fixScrollBar();

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