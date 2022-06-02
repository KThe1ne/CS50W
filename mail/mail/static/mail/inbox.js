document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

  // By default, load the inbox
  load_mailbox('inbox');
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';

  // Email POST request

  document.querySelector('#compose-form').onsubmit = function(){
    const recipients = document.querySelector('#compose-recipients').value;
    const subject = document.querySelector("#compose-subject").value;
    const body = document.querySelector("#compose-body").value;

    fetch('/emails', {
      method: 'POST',
      body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body
      })
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
    })
  }  
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';
  document.querySelector('#email').style.display ='none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  // Fetch emails
  fetch('/emails/'+ mailbox)
  .then(response => response.json())
  .then(emails => {
    console.log("Fetched")
    console.log(emails)
    // Create a div element for each email
    for (let i=0; i<emails.length; i++){

      const email_container = document.createElement('div');
      email_container.className = "email-container " + i;
      document.querySelector('#emails-view').append(email_container);

    }

    const emailContainerSelector = document.querySelectorAll(".email-container");

    emailContainerSelector.forEach(function(container, i) { 
        container.innerHTML = `<h5>From: ${emails[i]["recipients"].toString()}</h5>
                              <h6>${emails[i]["subject"]}</h6>
                              <p>${emails[i]["body"]}</p>`;
      
      // Change condition to read vs unread
      if (emails['read'] === false){
        container.style.backgroundColor = '#ededed';
      }

      container.style.padding = '10px';
      container.style.border = '2px #d4d4d4 solid';
      container.style.marginBottom = '5px';
      container.style.cursor = 'pointer';

      // Make each email preview clickable
      container.addEventListener('click', function(){
        fetch('emails/'+emails[i].id)
        .then(response => response.json())
        .then(email => emailClick(email, mailbox))
      })
    })
  })
}

function emailClick(email, mailbox){
  {
    // Set 'read' status
    fetch('emails/'+email.id, {
      method: 'PUT',
      body: JSON.stringify({
          read: true
      })
    })

    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#email').style.display = 'block';

    // Define content of 'div' 
    document.querySelector('#email-details').innerHTML = 
      `
        <h5>${email["subject"]}</h5>
        <hr>
        <br>
        <h5>${email["sender"]} <span id="timestamp">${email["timestamp"]}</span></h5>
        <p>to ${email["recipients"].toString()}</p>
        <br>
        <p>${email["body"]}</p>
      `

    // Reduce font of timestamp
    document.querySelector("#timestamp").style.fontSize = '0.5em';

    // Change text of button depending on archive status
    if (email["archived"] === true){
      document.querySelector("#archiveBtn").innerHTML = 'Unarchive';
    }
    else{
      document.querySelector("#archiveBtn").innerHTML = 'Archive';
    }

    // Remove archive button for emails sent by user
    if (mailbox === 'sent'){
      document.querySelector("#archiveBtn").style.display = 'none';
    } 
  }

  document.querySelector('#archiveBtn').onclick = function() {

    if (email["archived"] === false){
      fetch('emails/'+email.id, {
        method: 'PUT',
        body: JSON.stringify({
            archived: true
        })
      })
      .then(() => load_mailbox('inbox'));
    }

    else{
      fetch('emails/'+email.id, {
        method: 'PUT',
        body: JSON.stringify({
            archived: false
        })
      })
      .then(() => load_mailbox('inbox'));
    }
    
  }

}

