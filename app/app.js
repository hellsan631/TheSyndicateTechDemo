$(document).ready(function(){
  $('#pagepiling').pagepiling({
    sectionsColor: ['#f2f2f2', '#4BBFC3', '#212121'],
    sectionSelector: '.page',
    afterRender: onRender,
  });
});

function onRender () {
  var containers = [
    document.querySelector('#left'),
    document.querySelector('#right')
  ];

  var points  = 0;
  var drake   = dragula(containers);
  var timeout;
  var textLength = 0;

  drake.on('dragend', dragEnd);

  $(".scramble").bind('change keyup input', scramble);

  setInterval(function(){
    if ($(".scrambled")[0].innerHTML.length !== textLength) {
      if (!timeout) {
        doScramble($(".scramble")[0]);
      }
    }
  }, 100);

  function scramble(){
    var _this = this;

    if (!timeout) {
      timeout = setTimeout(function(){
        doScramble(_this);
      }, 200);
    } else {
      clearTimeout(timeout);
      timeout = false;

      timeout = setTimeout(function(){
        doScramble(_this);
      }, 200);
    }
  }

  function doScramble(_this){
    var textBox   = $(".scrambled[sid="+$(_this).attr("sid")+"]");
    var textValue = $(_this);

    textBox.css('color', '#ddd');

    textLength = textValue.val().length;

    textBox.shuffleLetters({
      "text": textValue.val()
    });

    setTimeout(function(){
      textBox.css('color', '#fff');
    }, 2000);

    clearTimeout(timeout);
    timeout = false;
  }

  function dragEnd (el) {
    if (el.innerHTML.indexOf("<b>S</b>") !== -1) {
      points++;
    } else if (el.innerHTML.indexOf("<b>y</b>") !== -1) {
      points++;
    } else if (el.innerHTML.indexOf("<b>n</b>") !== -1) {
      points++;
    } else if (el.innerHTML.indexOf("<b>d</b>") !== -1) {
      points++;
    } else if (el.innerHTML.indexOf("<b>i</b>") !== -1) {
      points++;
    } else if (el.innerHTML.indexOf("<b>c</b>") !== -1) {
      points++;
    } else if (el.innerHTML.indexOf("<b>a</b>") !== -1) {
      points++;
    } else if (el.innerHTML.indexOf("<b>t</b>") !== -1) {
      points++;
    } else if (el.innerHTML.indexOf("<b>e</b>") !== -1) {
      points++;
    }

    if (points === 9) {
      swal("You've Spelled Syndicate. Congrats!");
    }

    return true;
  }
}
