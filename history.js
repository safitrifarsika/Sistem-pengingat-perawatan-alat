document.addEventListener('DOMContentLoaded', function () {
  displayMaintenanceHistory();
});

function displayMaintenanceHistory() {
  const history = JSON.parse(localStorage.getItem('maintenanceHistory')) || [];
  const historyList = document.getElementById('history-list');
  historyList.innerHTML = '';

  if (history.length === 0) {
    historyList.innerHTML = '<li class="empty-message">Belum ada riwayat perawatan.</li>';
    return;
  }

  history.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('history-item');
    listItem.innerHTML = `
      <div class="history-details">
        <strong>${item.equipment}</strong>
        <span>Perawatan berikutnya: ${item.nextMaintenanceDate}</span>
      </div>
      <button class="delete-button" onclick="deleteMaintenance(${index})">Hapus</button>
    `;
    historyList.appendChild(listItem);
  });
}

function deleteMaintenance(index) {
  const history = JSON.parse(localStorage.getItem('maintenanceHistory')) || [];
  history.splice(index, 1);
  localStorage.setItem('maintenanceHistory', JSON.stringify(history));
  displayMaintenanceHistory();
}
