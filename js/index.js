'use strict';

( function init () {

   //  Window function
   function onWindowLoad() {

       let wrapper = document.createElement(`div`);
       let relativeContainer = document.createElement('div');
       let innerWrapper = document.createElement('div');
       let callUs = document.createElement('div');

       let callUsText = document.createElement('p');
       let callButton = document.createElement('button');
       let callIcon = document.createElement('span');

       wrapper.innerText = 'X';
       callUsText.innerText = 'Call Us Now';
       callButton.innerText = '+1-4338-123-4567';

       //  Add inline style to widget using IIFE.
       function addStyle () {
           // Wrapper style.
           createStyle(wrapper, {
               width: '50px',
               height: '50px',
               borderRadius: '50%',
               fontSize: '18px',
               fontFamily: '"Trebuchet MS", Helvetica, sans-serif',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               color: '#fff',
               backgroundColor: '#333',
               position: 'fixed',
               bottom: '100px',
               right: '50px',
               cursor: 'pointer',
               outline: 'none',
           });

           // Inner wrapper style
           createStyle(innerWrapper, {
               width: '200px',
               height: '50px',
               color: '#fff',
               display: 'none',
               position: 'absolute',
               top: '-120px',
               left: '-210px'
           });

           createStyle(relativeContainer, {
               position: 'relative',
               width: '0',
               height: '0'
           });

           createStyle(callUs, {
               backgroundColor: '#333',
               padding: '8px',
               borderRadius: '20px',
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',
           });

           createStyle(callUsText, {
               color: '#fff',
               fontSize: '20px',
               textAlign: 'center',
               margin: '4px 0'
           });


           createStyle(callButton, {
              backgroundColor: '#555',
              color: '#75fe75',
              fontSize: '16px',
              fontWeight: '500',
              padding: '6px 12px',
              borderRadius: '20px',
              margin: '8px 0',
              borderColor: 'transparent',
              outline: 'none'
           })
       }

       // Show hide call us widget
       function handleWrapperClick(e){
           e.stopPropagation();

           // To toggle call us div.
           if(innerWrapper.style.display === 'block'){
               innerWrapper.style.display = 'none';
           }
           else{
               // Updating call widget details
               fetchCallDetails();
               innerWrapper.style.display = 'block';
           }
       }


       //  Widget API call.
       function fetchCallDetails () {

           fetch('https://codifyinditest.com/script_test/api-test/')
               .then(resp => resp.json())
               .then(data => {
                   if(data instanceof Object && Object.keys(data).length > 0 && data['script test'] && Object.keys(data['script test']).length > 0){
                       // Null check
                       if(data['script test']['labels']){
                           callUsText.innerText = data['script test']['labels'];
                       }

                       // Null check
                       if(data['script test']['phone_number']){
                           callButton.innerText = data['script test']['phone_number'];
                       }


                   }
               })
               .catch(err => console.error('Error:', err));
       }


       // Add widget wrapper to body.
       document.body.appendChild(wrapper);

       // Add innerWrapper to wrapper.
       wrapper.appendChild(relativeContainer);

       // Relative container to wrap around absolute container.
       relativeContainer.appendChild(innerWrapper);

       // Inner wrapper
       innerWrapper.appendChild(callUs);

       // click handler for wrapper
       wrapper.addEventListener('click', handleWrapperClick);

       // Adding all the element created above to body.
       // Call Us
       callUs.appendChild(callUsText);
       callUs.appendChild(callButton);

       // Initial fetch.
       fetchCallDetails();

       // Add style to widget
       addStyle();

   }

   //  First thing to do is load init function after window load.
   window.addEventListener('load', onWindowLoad)

})();

// Add style to element
function createStyle(element, elementStyle) {

    if(element && elementStyle instanceof Object ){
        Object.keys(elementStyle).map(function (cssProp) {
            element.style[cssProp] = elementStyle[cssProp];
        });
    }

}