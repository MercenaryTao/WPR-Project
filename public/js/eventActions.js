async function updateEvent(id) {
  const event = document.getElementById('eventInput').value;
  const category = document.getElementById('categoryInput').value;
  const date = document.getElementById('dateInput').value;
  const price = document.getElementById('priceInput').value;
  const quantity = document.getElementById('quantityInput').value;

  const response = await fetch(`/EditEvent/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      event,
      category,
      date,
      price,
      quantity
    })
  });

  if (response.redirected) {
    window.location.href = response.url;
  } else {
    window.location.href = '/Events';
  }
}

async function deleteEvent(id) {
  if (!confirm('Are you sure you want to delete this event?')) {
    return;
  }

  const response = await fetch(`/DeleteEvent/${id}`, {
    method: 'POST'
  });

  if (response.redirected) {
    window.location.href = response.url;
  } else {
    window.location.href = '/Events';
  }
}
