document.getElementById('reminder-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const equipment = document.getElementById('equipment').value;
  const lastMaintenance = new Date(document.getElementById('last-maintenance').value);
  const interval = parseInt(document.getElementById('maintenance-interval').value);

  const nextMaintenanceDate = new Date(lastMaintenance);
  nextMaintenanceDate.setDate(nextMaintenanceDate.getDate() + interval);

  saveMaintenanceHistory(equipment, nextMaintenanceDate);

  document.getElementById('notification').textContent = 'Pengingat berhasil ditambahkan!';
  document.getElementById('notification').style.display = 'block';

  setTimeout(() => {
    document.getElementById('notification').style.display = 'none';
  }, 3000);

  this.reset();
});

function saveMaintenanceHistory(equipment, nextMaintenanceDate) {
  const history = JSON.parse(localStorage.getItem('maintenanceHistory')) || [];
  history.push({
    equipment,
    nextMaintenanceDate: nextMaintenanceDate.toISOString().split('T')[0],
  });
  localStorage.setItem('maintenanceHistory', JSON.stringify(history));
}
