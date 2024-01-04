document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    document.querySelectorAll('.block').forEach(block => {
        block.addEventListener('dragstart', dragStart);
        block.addEventListener('dragend', dragEnd);
    });

    gameBoard.addEventListener('dragover', dragOver);
    gameBoard.addEventListener('drop', drop);
});

function dragStart(e) {
    const rect = e.target.getBoundingClientRect();
    e.dataTransfer.setData('text/plain', e.target.id);
    e.dataTransfer.setData('offsetX', (e.clientX - rect.left).toString());
    e.dataTransfer.setData('offsetY', (e.clientY - rect.top).toString());
    e.target.classList.add('dragging');
}

function dragEnd(e) {
    e.target.classList.remove('dragging');
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const offsetX = parseInt(e.dataTransfer.getData('offsetX'), 10);
    const offsetY = parseInt(e.dataTransfer.getData('offsetY'), 10);
    const draggableElement = document.getElementById(id);
    const dropzone = e.target.closest('#game-board');

    if (dropzone) {
        const rect = dropzone.getBoundingClientRect();
        let x = e.clientX - rect.left - offsetX;
        let y = e.clientY - rect.top - offsetY;

        x = Math.round(x / 100) * 100;
        y = Math.round(y / 100) * 100;

        draggableElement.style.left = x + 'px';
        draggableElement.style.top = y + 'px';
        dropzone.appendChild(draggableElement);
    }
}
