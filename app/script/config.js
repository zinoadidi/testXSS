     /*App settings*/
     let authToken = btoa("arm:@rm1k0y1l@g0s")
     let appSettings = {
         appTitle:'Test XSS',
         displayContainer:'display',
         defaultPage:'home',
         errorPage:'error',
         loadDefaultPage:true,
         trackUrlChanges:false,
         registerPageHistory:true,
         viewPath:'app/view/',
         serverUrl:'http://192.168.250.29:8000/pdiv/',
         appMode:'debug',
         httpReqHeaders:{
             "Content-Type": "application/json",
             "Accept": "application/json",
             "Access-Control-Allow-Credentials":"true"
         }, 
         httpRequestAuth:{
             "status": true,
             "authName":"Basic",
             "authToken": authToken
         },
         loader:{
             active:false,
             useCustom:true,
             id:'loadingbar', 
             imgUrl: '',
             text:'Loading...',
             showImg:false,
             showTxt:true,
             imgSize:'',
             style:'',
             class:'loader'
         }
     };
     renda.config(appSettings);
  


     // send ajax req
     function sendRequest(data){
        if(data){
            $('#loader').hide();
            try{
                JSON.parse(data);
            }catch(err){
                stopLoad()
                alert('An error occured while getting information')
                console.dir(err);
            }finally{
                $('#resultDiv').html(data);
                return false;
            }           
        }else{
            var data = {};
            data.reqPath = document.getElementById('reqPath').value;
            data.reqData = document.getElementById('reqData').value;
            data.reqType = document.getElementById('reqType').value;
           if(data.reqPath == ''){
            alert('please provide information for the fields specified')
           }
           $('#loader').show();           
           if(data.reqType == 'GET'){
            renda.get(data.reqPath+data.reqData,'sendRequest',);
           }else{
            if(data.reqData == ''){
                /* if(confirm('post without data!. continue?')){
                }else{
                    $('#loader').hide();
                    return false;
                } */
            }
           
           // data.reqData =JSON.stringify(data.reqData)
           //data.reqData = eval("(" + data.reqData + ")");
            renda.post(data.reqPath,JSON.stringify(data.reqData),'sendRequest');  
           }
           console.log(data)
        }
     }

     function showBaseUrl(){
         $('#baseUrlHolder').text('Base URL: '+renda.Config.serverUrl);
     }
