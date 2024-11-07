'use strict';
// code
const blogContent = {
  1: {
    code: `
      <h1>Header of the Document</h1>
      <p>This is a <strong>bold</strong> word and this is an <em>italic</em> word.</p>
      <p>This paragraph includes a line break.<br>Here is the new line.</p>
      <hr>
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
        <li>List item 3</li>
      </ul>
      <img src="https://via.placeholder.com/150" alt="Sample Image">
      <table border="1">
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
        </tr>
        <tr>
          <td>Row 1, Cell 1</td>
          <td>Row 1, Cell 2</td>
        </tr>
        <tr>
          <td>Row 2, Cell 1</td>
          <td>Row 2, Cell 2</td>
        </tr>
      </table>
      <p>Visit <a href="https://www.example.com" target="_blank">this online store</a>.</p>
    `
  },
  2: {
    code: `<pre><code>console.log('Hello World');</code></pre>`
  },
  3: {
    code: `<pre><code>console.log('Hello World');</code></pre>`
  }
};


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}


// Blog modal variables
const BlogmodalContainer = document.querySelector("[data-blogmodal-container]");
const BlogmodalCloseBtn = document.querySelector("[data-blogmodal-close-btn]");
const Blogoverlay = document.querySelector("[data-blogoverlay]");

// 模态框变量
const BlogmodalTitle = document.querySelector("[data-blogmodal-title]");
const BlogmodalDate = document.querySelector("[data-blogmodal-date]");
const BlogmodalText = document.querySelector("[data-blogmodal-text]");
const BlogmodalCode = document.querySelector("[data-blogmodal-code]");

// 模态框切换函数
const modalToggle = function () {
  BlogmodalContainer.classList.toggle("active");
  Blogoverlay.classList.toggle("active");
};

// 为每个博客项添加点击事件
const blogItems = document.querySelectorAll("[data-blog-item]");

blogItems.forEach(item => {
  item.addEventListener("click", function () {
    BlogmodalTitle.innerHTML = this.querySelector(".blog-item-title").innerHTML;
    BlogmodalDate.innerHTML = this.querySelector("time").innerHTML;
    BlogmodalText.innerHTML = this.querySelector(".blog-text").innerHTML;

    const blogId = this.getAttribute("data-blog-id");
    const content = blogContent[blogId]; // 获取对应的内容
    BlogmodalCode.innerHTML = content ? content.code : ""; // 插入代码块

    // 显示模态框
    modalToggle();
  });
});

// 添加点击事件到模态框关闭按钮
BlogmodalCloseBtn.addEventListener("click", modalToggle);
Blogoverlay.addEventListener("click", modalToggle);



// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// 初始化 EmailJS
emailjs.init({
  publicKey: 'f_NN87Mdd0tIwXPoh',
  // Do not allow headless browsers
  blockHeadless: true,
  blockList: {
    // Block the suspended emails
    list: ['foo@emailjs.com', 'bar@emailjs.com'],
    // The variable contains the email address
    watchVariable: 'userEmail',
  },
  limitRate: {
    // Set the limit rate for the application
    id: 'app',
    // Allow 1 request per 10s
    throttle: 10000,
  },
});  // 替换成您在 EmailJS 注册后获得的 User ID (private key)

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// 表单提交事件
form.addEventListener("submit", function (event) {
  event.preventDefault();  // 防止表单默认提交

  // 获取表单数据
  const formData = new FormData(form);

  // 将表单数据转为对象
  // const data = {
  //   fullname: formData.get("fullname"),
  //   message: formData.get("message")
  // };

  var templateParams = {
    fullname: formData.get("fullname") + " (" + formData.get("email") + ")",
    message: formData.get("message"),
  };

  // 使用 EmailJS 发送邮件
  emailjs.send("service_g7niiwp", "template_r8gq2xs", templateParams)
    .then(function(response) {
      console.log("SUCCESS!", response);
      alert("Your message has been sent successfully.");
      form.reset();  // 重置表单
    }, function(error) {
      console.log("FAILED...", error);
      alert("Failed to send the message. Please try again.");
    });
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
// for (let i = 0; i < navigationLinks.length; i++) {
//   navigationLinks[i].addEventListener("click", function () {

//     for (let i = 0; i < pages.length; i++) {
//       if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
//         pages[i].classList.add("active");
//         navigationLinks[i].classList.add("active");
//         window.scrollTo(0, 0);
//       } else {
//         pages[i].classList.remove("active");
//         navigationLinks[i].classList.remove("active");
//       }
//     }

//   });
// }

// add event to all nav link
navigationLinks.forEach((link) => {
  link.addEventListener("click", function () {
    const selectedPage = this.innerHTML.toLowerCase(); // 获取当前点击的链接文本

    // 隐藏所有页面并移除所有导航链接的 active 类
    pages.forEach((page) => {
      page.classList.remove("active");
    });
    navigationLinks.forEach((navLink) => {
      navLink.classList.remove("active");
    });

    // 根据点击的链接文本显示相应的页面
    pages.forEach((page) => {
      if (selectedPage === page.dataset.page) {
        page.classList.add("active");
        window.scrollTo(0, 0); // 滚动到顶部
      }
    });

    // 为当前链接添加 active 类
    this.classList.add("active");
  });
});