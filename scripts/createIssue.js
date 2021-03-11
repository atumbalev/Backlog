'use-strict';

let createButton = document.getElementById('add-issue')
let issues = document.querySelectorAll('.issues')

function createIssue(titleMessage, descriptionMessage) {
    let newIssue = document.createElement("li")
    newIssue.classList.add('issue')
    newIssue.setAttribute('draggable', 'true');

    newIssue.addEventListener('dragstart', () => {
        newIssue.classList.add('dragging')
        deletionTray.style.visibility = 'visible'
        deletionTray.style.height = '30%'
    })

    newIssue.addEventListener('dragend', () => {
        newIssue.classList.remove('dragging')
        deletionTray.style.visibility = 'hidden'
        deletionTray.style.height = '0'
    })
    
    let title = document.createElement('p')
    title.classList.add('issue-title')
    title.setAttribute('contenteditable', 'true');
    title.innerHTML = titleMessage;

    let description = document.createElement('p')
    description.classList.add('issue-description')
    description.setAttribute('contenteditable', 'true');
    description.innerHTML = descriptionMessage;

    newIssue.appendChild(title)
    newIssue.appendChild(description)

    return newIssue;
}

createButton.addEventListener('click', e => {
    let newIssue = createIssue("Issue Title", "Issue Description")
    createButton.insertAdjacentElement("afterend", newIssue);
})