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

function ensureMobilePlusTabs() {
  if (!document.body) return null
  let tabs = document.getElementById("xiaoyou-plus-tabs")
  if (tabs) return tabs
  tabs = document.createElement("div")
  tabs.id = "xiaoyou-plus-tabs"
  tabs.setAttribute("role", "group")
  tabs.setAttribute("aria-label", "加号菜单分类")
  for (const [id, label] of [["options", "操作"], ["extensions", "扩展"], ["quick", "快捷回复"]]) {
    const button = document.createElement("button")
    button.type = "button"
    button.dataset.xiaoyouTab = id
    button.textContent = label
    button.addEventListener("mousedown", (event) => event.stopPropagation())
    button.addEventListener("click", (event) => {
      event.preventDefault()
      event.stopPropagation()
      document.body.dataset.xiaoyouPlusTab = id
      syncPlusPanels()
    })
    tabs.appendChild(button)
  }
  document.body.appendChild(tabs)
  return tabs
}

function syncPlusPanels() {
  const menu = document.getElementById("extensionsMenu")
  const open = plusMenuOpen()
  const wasOpen = document.body.classList.contains("xiaoyou-plus-open")
  document.body.classList.toggle("xiaoyou-plus-open", open)
  const tabs = ensureMobilePlusTabs()
  if (open && !wasOpen) document.body.dataset.xiaoyouPlusTab = "options"
  if (tabs) {
    const available = {
      options: !!document.getElementById("options"),
      extensions: !!menu,
      quick: !!document.getElementById("qr--bar"),
    }
    if (!available[document.body.dataset.xiaoyouPlusTab]) {
      document.body.dataset.xiaoyouPlusTab = "options"
    }
    tabs.querySelectorAll("button").forEach((button) => {
      const id = button.dataset.xiaoyouTab
      button.hidden = !available[id]
      button.setAttribute("aria-pressed", String(id === document.body.dataset.xiaoyouPlusTab))
    })
  }
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
