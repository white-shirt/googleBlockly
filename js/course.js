var course = document.querySelector('.course');
var arrs = ['blockly_front','blockly_back']
course.onclick = function () {
  sideBarBtn.state = 'opened';
  BtnMove();
  Courses('front',arrs)
}

function Courses(dir, arr) {
  mask.style.display = 'block';
  
}

