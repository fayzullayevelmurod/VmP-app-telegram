// lang
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".lang-select").forEach((select) => {
    const currentBtn = select.querySelector(".lang-select__current");
    const currentText = currentBtn.querySelector("span");
    const listItems = select.querySelectorAll(".lang-select__list li");

    currentBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      document.querySelectorAll(".lang-select.open").forEach((el) => {
        if (el !== select) el.classList.remove("open");
      });

      select.classList.toggle("open");
    });

    listItems.forEach((item) => {
      item.addEventListener("click", () => {
        currentText.textContent = item.textContent;
        select.classList.remove("open");
      });
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".lang-select.open").forEach((select) => {
      select.classList.remove("open");
    });
  });
});
// lang

// email
(() => {
  const field = document.getElementById("emailField");
  if (!field) return;

  const input = field.querySelector("#email");
  if (!input) return;

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  input.addEventListener("blur", () => {
    if (input.value && !isValidEmail(input.value)) {
      field.classList.add("error");
    } else {
      field.classList.remove("error");
    }
  });

  input.addEventListener("input", () => {
    field.classList.remove("error");
  });
})();
// email

// code
/* ===============================
OTP VERIFICATION – FULL JS
================================ */
(function () {
  "use strict";

  // DOM mavjudligini tekshirib olamiz
  const inputs = document.querySelectorAll('.otp-inputs input');
  const container = document.querySelector('.otp-container');
  const timerEl = document.getElementById('timer');
  const resendBtn = document.querySelector('.resend-btn');
  const messageEl = document.querySelector('.otp-message');

  // Agar OTP DOM yo‘q bo‘lsa → kod jim chiqib ketadi (xatolik YO‘Q)
  if (!inputs.length || !container || !timerEl || !resendBtn || !messageEl) {
    return;
  }

  let timeLeft = 33;
  let timer = null;

  /* ===============================
  INPUT LOGIC (AUTO FOCUS, PASTE)
  ================================ */
  function setupOtpFlow() {
    inputs.forEach((input, index) => {

      // Boshlang‘ich holatda faqat birinchi input faol
      if (index !== 0) input.disabled = true;

      input.addEventListener("input", () => {
        // Faqat raqam
        input.value = input.value.replace(/\D/g, "");

        // Agar 1 ta raqam yozilsa → keyingisini ochish
        if (input.value.length === 1) {
          input.disabled = true;

          if (inputs[index + 1]) {
            inputs[index + 1].disabled = false;
            inputs[index + 1].focus();
          }
        }

        validateCodeSafe();
      });

      // Backspace bilan orqaga qaytish
      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !input.value && index > 0) {
          input.disabled = true;
          inputs[index - 1].disabled = false;
          inputs[index - 1].focus();
        }
      });

      // Paste qilish (243690 kabi)
      input.addEventListener("paste", (e) => {
        e.preventDefault();

        const data = (e.clipboardData || window.clipboardData)
          .getData("text")
          .replace(/\D/g, "")
          .split("");

        data.forEach((digit, i) => {
          if (inputs[i]) {
            inputs[i].value = digit;
            inputs[i].disabled = false;
          }
        });

        const lastIndex = Math.min(data.length, inputs.length) - 1;
        if (inputs[lastIndex]) inputs[lastIndex].focus();

        validateCodeSafe();
      });
    });
  }

  /* ===============================
  VALIDATION LOGIC (SAFE WRAPPER)
  ================================ */
  function validateCodeSafe() {
    if (typeof validateCode === "function") {
      validateCode();
    }
  }

  function validateCode() {
    const code = Array.from(inputs).map(input => input.value).join('');

    if (code.length < inputs.length) {
      container.dataset.state = 'default';
      return;
    }

    // Fake validation (example)
    if (code !== '123456') {
      container.dataset.state = 'error';
    } else {
      container.dataset.state = 'default';
      alert('Code verified successfully!');
    }
  }

  /* ===============================
  TIMER LOGIC
  ================================ */
  function startTimer() {
    if (timer) clearInterval(timer);

    timeLeft = 33;
    timerEl.textContent = timeLeft;
    messageEl.hidden = false;
    resendBtn.hidden = true;

    timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timer);
        timer = null;
        messageEl.hidden = true;
        resendBtn.hidden = false;
      }
    }, 1000);
  }

  /* ===============================
  RESEND CODE
  ================================ */
  resendBtn.addEventListener('click', () => {
    inputs.forEach((input, index) => {
      input.value = '';
      input.disabled = index !== 0;
    });

    inputs[0].focus();
    container.dataset.state = 'default';
    startTimer();
  });

  /* ===============================
  INIT (SAFE)
  ================================ */
  document.addEventListener("DOMContentLoaded", () => {
    setupOtpFlow();
    startTimer();
    inputs[0].focus();
  });

})();
 // code

// tabs
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-tabs]").forEach((tabs) => {
    const buttons = tabs.querySelectorAll(".tabs__btn");
    const panels = tabs.querySelectorAll(".tabs__panel");

    if (!buttons.length || !panels.length) return;

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.dataset.tab;
        if (!targetId) return;

        buttons.forEach((b) => b.classList.remove("is-active"));
        panels.forEach((p) => p.classList.remove("is-active"));

        btn.classList.add("is-active");
        tabs.querySelector(`#${targetId}`)?.classList.add("is-active");
      });
    });
  });
});
// tabs

// modal
document.addEventListener("DOMContentLoaded", () => {
  const modalBg = document.querySelector(".modal_bg_one");
  const modal = document.querySelector(".modal_manage");

  if (!modalBg || !modal) return;

  const openModal = () => {
    modalBg.classList.add("active");
    modal.classList.add("active");
  };

  const closeModal = () => {
    modalBg.classList.remove("active");
    modal.classList.remove("active");
  };

  document.addEventListener("click", (e) => {
    // OPEN
    if (e.target.closest(".edit_btn")) {
      openModal();
      return;
    }

    // CLOSE
    if (
      e.target.closest(".modal_manage_close") ||
      e.target.closest(".white_btn") ||
      e.target === modalBg
    ) {
      closeModal();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const modalBg = document.querySelector(".modal_bg_two");
  const modal = document.querySelector(".modal_device_name");

  if (!modalBg || !modal) return;

  const openModal = () => {
    modalBg.classList.add("active");
    modal.classList.add("active");
  };

  const closeModal = () => {
    modalBg.classList.remove("active");
    modal.classList.remove("active");
  };

  document.addEventListener("click", (e) => {
    // OPEN
    if (e.target.closest(".delete_btn")) {
      openModal();
      return;
    }

    // CLOSE
    if (
      e.target === modalBg ||
      e.target.closest(".no_btn") ||
      e.target.closest(".red_btn")
    ) {
      closeModal();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const openBtns = document.querySelectorAll(".subscription_modal_btn");
  const closeBtns = document.querySelectorAll(".subscription_modal_close");
  const modalBg = document.querySelector(".modal_bg_three");
  const modal = document.querySelector(".subscription_modal");

  if (!modalBg || !modal) return;

  function openModal() {
    modalBg.classList.add("active");
    modal.classList.add("active");
  }

  function closeModal() {
    modalBg.classList.remove("active");
    modal.classList.remove("active");
  }

  openBtns.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  modalBg.addEventListener("click", closeModal);
});

document.addEventListener("DOMContentLoaded", () => {
  const openBtns = document.querySelectorAll(".plan_btn");
  const closeBtns = document.querySelectorAll(".plan_modal_close");
  const prevLinks = document.querySelectorAll(".prev_link");
  const modalBg = document.querySelector(".modal_bg_four");
  const modal = document.querySelector(".plan_modal");

  if (!modalBg || !modal) return;

  const openModal = () => {
    modalBg.classList.add("active");
    modal.classList.add("active");
  };

  const closeModal = () => {
    modalBg.classList.remove("active");
    modal.classList.remove("active");
  };

  openBtns.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  closeBtns.forEach((btn) => {
    btn.addEventListener("click", closeModal);
  });

  prevLinks.forEach((link) => {
    link.addEventListener("click", closeModal);
  });

  modalBg.addEventListener("click", closeModal);
});
// modal

// dark-mode
document.addEventListener("DOMContentLoaded", () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function applyTheme(e) {
    document.body.classList.toggle("dark-theme", e.matches);
  }

  // Initial apply
  applyTheme(prefersDark);

  // Listen for system theme change
  prefersDark.addEventListener("change", applyTheme);
});
// dark-mode
