# CLAUDE.md

Statický web zednické firmy **Zednictví Sliž** (Marek Sliž, Bystřice 1398, 739 95, IČO 73194417) – nástupce starého webu na Webnode (www.zedniktrinec.cz). Obsah i komunikace s uživatelem jsou v češtině.

## Struktura
- Čisté HTML/CSS/JS bez frameworku a bez build kroku. Zdrojem pravdy jsou přímo soubory v repozitáři.
- Stránky: `index.html`, `rekonstrukce-bytu.html`, `rodinne-domy.html`, `zatepleni-fasady.html`, `dalsi-cinnosti.html`, `o-nas.html`, `kontakt.html`.
- `css/style.css` – jediný stylopis; barvy a rozměry jako proměnné v `:root` (`--yellow`, `--ink`, `--header-h`…).
- `js/main.js` – mobilní menu, stín hlavičky, reveal animace, lightbox galerie, tlačítko „zobrazit další fotky“, dopočet let praxe (`[data-praxe]` = aktuální rok − 1995) a roku (`[data-year]`), poptávkový formulář (skládá `mailto:` – web nemá backend).
- `img/` – fotky pro web (max 1600 px), `img/nahled/` – náhledy do galerií (max 640 px) se stejnými názvy. Názvy popisují obsah (`koupelna-wc-01.jpg`, `hruba-stavba-05.jpg`…). `img/original/` je lokální záloha, v gitu není.
- `img/logo.svg` – logo překreslené do vektoru (text převeden na křivky, font Montserrat). `img/logo.png` je původní malé logo, používá se už jen ve strukturovaných datech.
- `rekonstrukce/`, `domy/`, `fasady/`, `dalsi/`, `o-nas/`, `kontakt/` – meta-refresh přesměrování starých Webnode adres (GitHub Pages neumí serverové přesměrování). `.htaccess` a `_redirects` dělají totéž pro Apache hosting / Netlify / Cloudflare.
- `sitemap.xml`, `robots.txt` – při přidání stránky aktualizovat sitemapu.

## Konvence
- Hlavička, patička, mobilní lišta s telefonem a JSON-LD (`HomeAndConstructionBusiness`) jsou **zkopírované v každé stránce** – změnu je nutné udělat ve všech 7 HTML souborech.
- Každá stránka má vlastní `<title>`, `<meta name="description">`, canonical a Open Graph. Canonical/OG URL míří na `https://www.zedniktrinec.cz/…`, ne na github.io.
- Cesty jsou vždy relativní (`img/…`, `css/…`), protože web běží i v podadresáři `/zednictvi-sliz/`.
- Obrázky v galerii: `<a href="img/X.jpg"><img src="img/nahled/X.jpg" alt="… – foto N" width height loading="lazy"></a>`. Nové fotky zmenšit (1600 px + náhled 640 px), neukládat plné rozlišení.
- Hlavička musí zůstat čistě bílá (`#fff`) i při scrollu – požadavek uživatele. Při scrollu se smí měnit jen stín.
- Mobilní menu se zapíná pod 1181 px; telefonní tlačítko v hlavičce je skryté mezi 1181–1379 px, aby se hlavička nevešla přes okraj. Po změnách v hlavičce ověřit, že na 1200/1280/1400/1920 px nevzniká vodorovný scroll.
- Nevymýšlet fakta o firmě (otevírací doba, reference, ceny, počty zakázek). Údaje přebírat ze starého webu nebo od uživatele.

## Náhled a nasazení
- Lokálně: `python -m http.server 8080` v kořeni (konfigurace `web` v `.claude/launch.json`). Otevření souboru přes `file://` v náhledu nenačte CSS.
- Hosting: GitHub Pages z větve `main` (kořen) – https://sulii01.github.io/zednictvi-sliz/, repozitář https://github.com/Sulii01/zednictvi-sliz. Po `git push` se web aktualizuje zhruba do minuty.
- Git je přenosný MinGit v `%LOCALAPPDATA%\Programs\MinGit\cmd` a není v PATH – v PowerShellu nejdřív `$env:Path = "$env:LOCALAPPDATA\Programs\MinGit\cmd;" + $env:Path`. `gh` je nainstalovaný a přihlášený (účet Sulii01).
- Do gitu nepatří: `img/original/`, `.claude/`, `JAK-ZVIDITELNIT-WEB.md` (interní návod k SEO a reklamě – na Pages by byl veřejný). Viz `.gitignore`.

## Otevřené body
- Doména www.zedniktrinec.cz zatím vede na Webnode; napojení na Pages (CNAME `www` → `sulii01.github.io`) čeká na uživatele.
- Odkaz na Facebook v `kontakt.html` je zakomentovaný – na starém webu byl jen vzorový odkaz Webnode, skutečná stránka zatím neexistuje.
- K ověření u majitele: rok začátku podnikání (1995), seznam obsluhovaných obcí. Chybí fotky zámkové dlažby a plotů.
