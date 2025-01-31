const putanje = {
  BombasScena: './scene/bombas/BombasScena.js',
  NemciIzRovova: './scene/rovovi/NemciIzRovova.js',
  Scena1942: './scene/avionce1942/Scena1942.js',
  CamacScena: './scene/CamacScena.js',
  OtpisaniScena: './scene/OtpisaniScena.js',
  Scena1944: './scene/avionce1944/Scena1944.js',
  TopScena: './scene/top/TopScena.js',
  TenkicIde: './scene/tenkic-ide/TenkicIde.js',
  TenkiciScena: './scene/tenkici/TenkiciScena.js',
  RanjenikScena: './scene/ranjenik/RanjenikScena.js',
  DrvarScena: './scene/drvar/DrvarScena.js',
  JasenovacScena: './scene/tenkovska/JasenovacScena.js',
  TenkOdozgoScena: './scene/tenkovska/TenkOdozgoScena.js',
  GlavniMeni: './GlavniMeni.js'
}

export async function loadScene(ime) {
  const module = await import(putanje[ime])
  return module.default
}
