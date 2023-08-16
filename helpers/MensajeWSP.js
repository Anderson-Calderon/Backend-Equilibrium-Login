

  const enviarMensaje = async ()=>{

    var botId = '101492573047428';
    var phoneNbr = '51914740170';
    var bearerToken = 'EAAKTGVA5BlEBO2pGzt3HUZAWJYVNntaB6d96ExeDGGJswaNoVZCT0YMUehISn6g87ax9OKO3dg51ihnDZBtdWJkQwfTC5ka5uGYd0b5ucxw2ocgDO5Kp6TE8xOchfrhZB4m6aYYEM9JhfjXRXk9gZBrQbGGJpJ1d3MTXMQsvnnYJ1ZAIQyOiBKnAeoph4R9kqLywHX9POZAalouyYbLKIXj';

    var url = 'https://graph.facebook.com/v17.0/' + botId + '/messages';
    var data = {
      messaging_product: 'whatsapp',
      to: phoneNbr,
      type: 'template',
      template: {
        name:'hello_world',
        language:{ code: 'en_US' }
      }
    };

    var postReq = {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + bearerToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      json: true
    };

    fetch(url, postReq)
      .then(data => {
        return data.json()
      })
      .then(res => {
        console.log(res)
      })
      .catch(error => console.log(error));


      }

export {enviarMensaje}