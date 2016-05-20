'use strict'
angular.module('sbAdminApp')
  .controller('DashboardCtrl', function(UserService, IdeaService, $state, ImageService) {

    var self = this;
    
    self.isDoodlerVisible = false;
    
    self.toggleDoodler = function (){
      self.isDoodlerVisible = !self.isDoodlerVisible;
    };
        
    init();
    
    self.saveImage = function () {
      var dataURL = canvas.toDataURL();
      
      var imageUrl = ImageService.saveImage(dataURL);
      
      if(imageUrl) {
        //angualr.element();
      }
      return imageUrl;
    };

    UserService.me().then(function(response) {
      self.me = response.data;
      getIdeas();
    });

    this.logout = function() {
      localStorage.removeItem('token');
      $state.go('login');
    };

    //this.ideas = [{title: "Title 1"},{title: "Title 1"},{title: "Title 1"}]

    function getIdeas() {
      IdeaService.getMemberIdeas(self.me.id).then(function(response) {
        self.myIdeas = response.data;
      });

      IdeaService.getOtherIdeas(self.me.id).then(function(response) {
        self.otherIdeas = response.data;
      });
    }
    
    

    this.addIdea = function(title, description, isPublic) {
      var idea = {
        title: title,
        description: description,
        member_id: this.me.id,
        isPublic: isPublic
      };

      IdeaService.addIdea(idea).then(function(response) {
        if(response.status == 200) {
          self.myIdeas.push(response.data);
        } else {
          alert("Error on sending data");
        }
      });
    };

    this.deleteIdea = function(idea) {
      IdeaService.deleteIdea(idea._id).then(function(response) {
        getIdeas();
      });
    };

});

// TODO: desperately in need of refactoring
// was written in a hurry so don't judge
var canvas, ctx, flag = false,
    prevX = 0,
    currX = 0,
    prevY = 0,
    currY = 0,
    dot_flag = false,
    rect = {},
    drag = false,
    drawingSurfaceImageData = null,
    defaultLineWidth = 2,
    currLineWidth = defaultLineWidth,
    fgcolpick,
    bgcolpick,
    bgtransppick,
    currentUndoStep,
    undoSteps = [],w,h;

var defaultColor,
    defaultBgColor,
    currColor,
    currBgColor;

var mm, md, mu, mo, oc; 

function init() {
    canvas = document.getElementById('can');
    ctx =  canvas.getContext("2d");
    w = canvas.width;
    h = canvas.height;
    
    fgcolpick = document.getElementById('fgcolpick');
    bgcolpick = document.getElementById('bgcolpick');
    bgtransppick = document.getElementById('bgtransppick');
    
    defaultColor = fgcolpick.value;
    defaultBgColor = bgcolpick.value;
    currColor = defaultColor;
    currBgColor = defaultBgColor;
    
    ctx.fillStyle = "white";    
    ctx.fillRect(0, 0, w, h);
    
    addUndoStep();
    initDraw();
  
    document.getElementById("download-link").addEventListener('click', dlCanvas, false);
}

function addUndoStep(){
  
  if(currentUndoStep) {
    undoSteps.push(currentUndoStep);
  }
  currentUndoStep = ctx.getImageData(
    0, 0, canvas.width,canvas.height
  );
}

function initDraw(){
  canvas.removeEventListener("mousemove", mm, false);
  canvas.removeEventListener("mousedown", md, false);
  canvas.removeEventListener("mouseup", mu, false);
  canvas.removeEventListener("mouseout", mo, false);

  mm = function (e) {
      findxy('move', e)
  };
  md = function (e) {
      findxy('down', e)
  };
  mu = function (e) {
      findxy('up', e)
  };
  mo = function (e) {
      findxy('out', e)
  };

  canvas.addEventListener("mousemove", mm, false);
  canvas.addEventListener("mousedown", md, false);
  canvas.addEventListener("mouseup", mu, false);
  canvas.addEventListener("mouseout", mo, false);
}

function initRect(){
  canvas.removeEventListener("mousemove", mm, false);
  canvas.removeEventListener("mousedown", md, false);
  canvas.removeEventListener("mouseup", mu, false);
  canvas.removeEventListener("mouseout", mo, false);

  md = function (e) {
      rectxy('down', e)
  };
  
  mm = function (e) {
      rectxy('move', e)
  };
  
  mu = function (e) {
      rectxy('up', e)
  };
  mo = function (e) {
      rectxy('out', e)
  };

  canvas.addEventListener("mousemove", mm, false);
  canvas.addEventListener("mousedown", md, false);
  canvas.addEventListener("mouseup", mu, false);
  canvas.addEventListener("mouseout", mo, false);
}

function initRoundRect(){
  canvas.removeEventListener("mousemove", mm, false);
  canvas.removeEventListener("mousedown", md, false);
  canvas.removeEventListener("mouseup", mu, false);
  canvas.removeEventListener("mouseout", mo, false);

  md = function (e) {
      rndrectxy('down', e)
  };
  
  mm = function (e) {
      rndrectxy('move', e)
  };
  
  mu = function (e) {
      rndrectxy('up', e)
  };
  mo = function (e) {
      rndrectxy('out', e)
  };

  canvas.addEventListener("mousemove", mm, false);
  canvas.addEventListener("mousedown", md, false);
  canvas.addEventListener("mouseup", mu, false);
  canvas.addEventListener("mouseout", mo, false);
}

function initLine(){
  canvas.removeEventListener("mousemove", mm, false);
  canvas.removeEventListener("mousedown", md, false);
  canvas.removeEventListener("mouseup", mu, false);
  canvas.removeEventListener("mouseout", mo, false);

  md = function (e) {
      linexy('down', e)
  };
  
  mm = function (e) {
      linexy('move', e)
  };

  mu = function (e) {
      linexy('up', e)
  };
  mo = function (e) {
      linexy('out', e)
  };

  canvas.addEventListener("mousemove", mm, false);
  canvas.addEventListener("mousedown", md, false);
  canvas.addEventListener("mouseup", mu, false);
  canvas.addEventListener("mouseout", mo, false);
}

function initEllipse(){
  canvas.removeEventListener("mousemove", mm, false);
  canvas.removeEventListener("mousedown", md, false);
  canvas.removeEventListener("mouseup", mu, false);
  canvas.removeEventListener("mouseout", mo, false);

  md = function (e) {
      ellxy('down', e)
  };
  
  mm = function (e) {
      ellxy('move', e)
  };
  
  mu = function (e) {
      ellxy('up', e)
  };
  mo = function (e) {
      ellxy('out', e)
  };

  canvas.addEventListener("mousemove", mm, false);
  canvas.addEventListener("mousedown", md, false);
  canvas.addEventListener("mouseup", mu, false);
  canvas.addEventListener("mouseout", mo, false);
}

function color(value) {
  currColor = value;
}

function bgcolor(value) {
  if(value==null){
    bgtransppick.style.left = '32px';
    bgtransppick.style.pointerEvents = 'none';
  } else {
    bgtransppick.style.left = '70px';
    bgtransppick.style.pointerEvents = 'auto';
  }
  currBgColor = value;
}

function shape(obj) {

    switch (obj.id) {
        case "ellipse":
            initEllipse();
            break;        
        case "roundrect":
            initRoundRect();
            break;
        case "line":
            initLine();
            break;
        case "rectangle":
            initRect();
            break;
        case "freeform":
          initDraw();
          break;
   }
}

function thick(value) {
  currLineWidth = value || defaultLineWidth;
}

function drawLine(x1,y1,x2,y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = currColor;
    ctx.lineWidth = currLineWidth;
    ctx.stroke();
    ctx.closePath();
}

function drawRect(x, y, w, h) {
  ctx.beginPath();
  if(currBgColor !== null) {
    ctx.fillStyle = currBgColor;    
    ctx.fillRect(x, y, w, h);
  }
  ctx.rect(x, y, w, h);
  ctx.strokeStyle = currColor;
  ctx.lineWidth = currLineWidth;
  ctx.stroke();
  ctx.closePath();
}

function drawRoundRect(x, y, width, height, radius) {
  var t;
  if(width < 0) {
    t = x;
    x = x+width;
    width = (-1)*width;
  }
  if(height < 0) {
    t = y;
    y = y+height;
    height = (-1)*height;
  }
  
  if(width < radius || height < radius){
    return;
  }

  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  
  ctx.strokeStyle = currColor;
  
  ctx.lineWidth = currLineWidth*((currBgColor !== null)?2:1);
  ctx.stroke();
  
  if(currBgColor !== null) {
    ctx.fillStyle = currBgColor;    
    ctx.fill();
  }  
}

function drawEllipse(x, y, width, height) {
  var t;
  if(width < 0) {
    t = x;
    x = x+width;
    width = (-1)*width;
  }
  if(height < 0) {
    t = y;
    y = y+height;
    height = (-1)*height;
  }
  ctx.beginPath();
  ctx.strokeStyle = currColor;
  ctx.ellipse(x+width/2, y+height/2, width/2, height/2, 0, 0, Math.PI*2);

  ctx.lineWidth = currLineWidth*((currBgColor !== null)?2:1);
  ctx.stroke();
  
  if(currBgColor !== null) {
    ctx.fillStyle = currBgColor;    
    ctx.fill();
  }
  ctx.closePath();
}

function erase() {
    var m = confirm("Are you sure you want to clear the doodle?");
    if (m) {
        if(currBgColor !== null) {
          ctx.fillStyle = currBgColor;    
          ctx.fillRect(0, 0, w, h);
        } else {
          ctx.clearRect(0, 0, w, h);
        }
        document.getElementById("canvasimg").style.display = "none";
    }
}

function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.getBoundingClientRect().left;
        currY = e.clientY - canvas.getBoundingClientRect().top;
        canvas.style.cursor = 'default';

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = currColor;
            ctx.fillRect(currX, currY, currLineWidth, currLineWidth);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
      if (flag) {
        addUndoStep();
      }
      flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.getBoundingClientRect().left;
            currY = e.clientY - canvas.getBoundingClientRect().top;
            drawLine(prevX, prevY, currX, currY);
        }
    }
}

function rectxy(res, e) {
  
    if (res == 'down') {
      drawingSurfaceImageData = ctx.getImageData(0, 0,
                             canvas.width,
                             canvas.height);
      rect.startX = e.clientX - canvas.getBoundingClientRect().left;
      rect.startY = e.clientY - canvas.getBoundingClientRect().top;
      canvas.style.cursor = 'default';
      drag = true;
    }
    
    if (res == 'up' || res == "out") {
      if (drag) {
        addUndoStep();
      }
      drag = false;
    }
    
    if (res == 'move') {
      if (drag) {
        rect.w = (e.clientX - canvas.getBoundingClientRect().left) - rect.startX;
        rect.h = (e.clientY - canvas.getBoundingClientRect().top) - rect.startY ;
        ctx.putImageData(drawingSurfaceImageData, 0, 0);
        drawRect(rect.startX, rect.startY, rect.w, rect.h);
      }
    }
}

function rndrectxy(res, e) {
  
    if (res == 'down') {
      drawingSurfaceImageData = ctx.getImageData(0, 0,
                             canvas.width,
                             canvas.height);
      rect.startX = e.clientX - canvas.getBoundingClientRect().left;
      rect.startY = e.clientY - canvas.getBoundingClientRect().top;
      canvas.style.cursor = 'default';
      drag = true;
    }
    
    if (res == 'up' || res == "out") {
      if (drag) {
        addUndoStep();
      }
      drag = false;
    }
    
    if (res == 'move') {
      if (drag) {
        rect.w = (e.clientX - canvas.getBoundingClientRect().left) - rect.startX;
        rect.h = (e.clientY - canvas.getBoundingClientRect().top) - rect.startY ;
        ctx.putImageData(drawingSurfaceImageData, 0, 0);
        drawRoundRect(rect.startX, rect.startY, rect.w, rect.h, 10);
      }
    }
}

function linexy(res, e) {
  
    if (res == 'down') {
      drawingSurfaceImageData = ctx.getImageData(0, 0,
                             canvas.width,
                             canvas.height);
      rect.startX = e.clientX - canvas.getBoundingClientRect().left;
      rect.startY = e.clientY - canvas.getBoundingClientRect().top;
      canvas.style.cursor = 'default';
      drag = true;
    }
    
    if (res == 'up' || res == "out") {
      if (drag) {
        addUndoStep();
      }
      drag = false;
    }
    
    if (res == 'move') {
      if (drag) {
        ctx.putImageData(drawingSurfaceImageData, 0, 0);
        drawLine(rect.startX,rect.startY,e.clientX - canvas.getBoundingClientRect().left,e.clientY - canvas.getBoundingClientRect().top);
      }
    }
}

function ellxy(res, e) {
  
    if (res == 'down') {
      drawingSurfaceImageData = ctx.getImageData(0, 0,
                             canvas.width,
                             canvas.height);
      rect.startX = e.clientX - canvas.getBoundingClientRect().left;
      rect.startY = e.clientY - canvas.getBoundingClientRect().top;
      canvas.style.cursor = 'default';
      drag = true;
    }
    
    if (res == 'up' || res == "out") {
      if (drag) {
        addUndoStep();
      }
      drag = false;
    }
    
    if (res == 'move') {
      if (drag) {
        rect.w = (e.clientX - canvas.getBoundingClientRect().left) - rect.startX;
        rect.h = (e.clientY - canvas.getBoundingClientRect().top) - rect.startY ;
        ctx.putImageData(drawingSurfaceImageData, 0, 0);
        drawEllipse(rect.startX, rect.startY, rect.w, rect.h);
      }
    }
}

function undo(){
  if(undoSteps.length>=1){
    currentUndoStep = undoSteps.pop();
    ctx.putImageData(currentUndoStep, 0, 0);
  }
}

/* REGISTER DOWNLOAD HANDLER */
/* Only convert the canvas to Data URL when the user clicks. 
   This saves RAM and CPU ressources in case this feature is not required. */
function dlCanvas() {
  var dt = canvas.toDataURL('image/png');
  /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
  dt = dt.replace(/^data:image\/[^;]*/, 'data:application/octet-stream');

  /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
  dt = dt.replace(/^data:application\/octet-stream/, 'data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Doodle.png');

  this.href = dt;
};
