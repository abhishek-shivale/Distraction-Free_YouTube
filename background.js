function inject() {
    function hideElement(selector) {
      const element = document.querySelector(selector);
      if (element) {
        element.style.display = "none";
      }
    }
  
    const observer = new MutationObserver(() => {
      hideElement('[page-subtype="home"]');
      hideElement('div#guide-content');
      hideElement('#shorts-container');
      hideElement('#related');
      hideElement('[section-identifier="comment-item-section"]');
    });
  
    observer.observe(document.body, { childList: true, subtree: true });
  }
  
  chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      if (details.tabId !== 'undefined' && details.tabId > 0) {
        chrome.scripting.executeScript({
          target: { tabId: details.tabId },
          func: inject,
        });
      }
    },
    { urls: ["*://www.youtube.com/*"] }
  );
  