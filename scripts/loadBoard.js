'use-strict';

(() =>{
    loadList("open", "resources/issuesOpen.json");
    loadList("in-progress", "resources/issuesInProgress.json");
    loadList("resolved", "resources/issuesResolved.json");
    loadList("closed", "resources/issuesClosed.json");
})();

function loadList(listID, listFile) {
    fetch(listFile)
        .then((blob) => {
            return blob.json();
        })
        .then((result) => {
            let inProgress = document.getElementById(listID)
            result.forEach(element => {
                let issue = createIssue(element["issue-title"], element["issue-description"])
                inProgress.appendChild(issue)
            });
        })
        .catch((err) => {
            console.log(err);
        });
}