function messageStamp(mes) {
  const node = mes.querySelector(".timestamp")
  const fromNode = node?.textContent?.replace(/\s+/g, " ").trim() || ""
  if (fromNode) return fromNode
  return (mes.getAttribute("timestamp") || "").replace(/\s+/g, " ").trim()
}

function messageTimer(mes) {
  const node = mes.querySelector(".mes_timer")
  return node?.textContent?.replace(/\s+/g, " ").trim() || ""
}

function syncMessageMeta() {
  document.querySelectorAll("#chat .mes").forEach((mes) => {
    const block = mes.querySelector(".mes_block")
    if (!block) return
    const stamp = messageStamp(mes)
    const timer = messageTimer(mes)
    let meta = block.querySelector(":scope > .xiaoyou-meta")
    if (!stamp && !timer) {
      meta?.remove()
      return
    }
    if (!meta) {
      meta = document.createElement("div")
      meta.className = "xiaoyou-meta"
      block.appendChild(meta)
    }
    const next = `${stamp}\n${timer}`
    if (meta.dataset.xiaoyouValue === next) return
    meta.dataset.xiaoyouValue = next
    meta.replaceChildren()
    if (stamp) {
      const stampEl = document.createElement("span")
      stampEl.className = "xiaoyou-meta-stamp"
      stampEl.textContent = stamp
      meta.appendChild(stampEl)
    }
    if (timer) {
      const timerEl = document.createElement("span")
      timerEl.className = "xiaoyou-meta-timer"
      timerEl.textContent = timer
      meta.appendChild(timerEl)
    }
  })
}

function plusMenuOpen() {
  const options = document.getElementById("options")
  if (!options) return false
  return window.getComputedStyle(options).display !== "none"
}

function syncPlusPanels() {
  const menu = document.getElementById("extensionsMenu")
  const open = plusMenuOpen()
  document.body.classList.toggle("xiaoyou-plus-open", open)
  if (!menu) return
  const next = open ? "flex" : "none"
  if (menu.style.display !== next) menu.style.display = next
}

function bindPlusPanels() {
  if (document.documentElement.dataset.xiaoyouPlus === "1") return
  document.documentElement.dataset.xiaoyouPlus = "1"

  const armMenu = (menu) => {
    if (!menu || menu.dataset.xiaoyouKeep === "1") return
    menu.dataset.xiaoyouKeep = "1"
    const stop = (event) => event.stopPropagation()
    menu.addEventListener("mousedown", stop)
    menu.addEventListener("click", stop)
  }

  const parkShortcutBar = () => {
    const bar = document.getElementById("qr--bar")
    if (bar) armMenu(bar)
  }

  const attach = () => {
    armMenu(document.getElementById("extensionsMenu"))
    parkShortcutBar()
    const options = document.getElementById("options")
    if (options && options.dataset.xiaoyouPlusWatch !== "1") {
      options.dataset.xiaoyouPlusWatch = "1"
      new MutationObserver(() => syncPlusPanels()).observe(options, {
        attributes: true,
        attributeFilter: ["style", "class"],
      })
    }
    syncPlusPanels()
    parkShortcutBar()
  }

  const watchForm = () => {
    const form = document.getElementById("send_form")
    if (!form || form.dataset.xiaoyouQrWatch === "1") return
    form.dataset.xiaoyouQrWatch = "1"
    new MutationObserver(() => parkShortcutBar()).observe(form, { childList: true, subtree: true })
  }

  attach()
  watchForm()
  document.addEventListener("click", () => {
    setTimeout(syncPlusPanels, 0)
  })
  if (document.body) {
    new MutationObserver(attach).observe(document.body, { childList: true })
  }
}

let metaFrame = 0

function scheduleMessageMeta() {
  if (metaFrame) return
  metaFrame = requestAnimationFrame(() => {
    metaFrame = 0
    syncMessageMeta()
  })
}

function bindMessageMeta() {
  const chat = document.getElementById("chat")
  if (!chat || chat.dataset.xiaoyouMeta === "1") return
  chat.dataset.xiaoyouMeta = "1"
  new MutationObserver(() => scheduleMessageMeta()).observe(chat, {
    childList: true,
    subtree: true,
    characterData: true,
  })
  scheduleMessageMeta()
}

export function installThreadBehavior() {
  bindPlusPanels()
  bindMessageMeta()
  scheduleMessageMeta()
}
