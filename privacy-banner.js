// Self-Contained TrypCar Privacy Matrix Module
(function() {
    // 1. Structural Verification: Check if user has already made a selection
    if (localStorage.getItem("trypcar_privacy_manifest") !== null) {
        return; // Halt execution if choice is already stored in browser memory
    }

    // 2. Inject CSS Style Constraints Directly Into Header Matrix
    const styleBlock = document.createElement("style");
    styleBlock.textContent = `
        #trypcar-gold-slider {
            position: fixed;
            bottom: -100%;
            left: 0;
            width: 100%;
            height: 15vh; /* Locked strictly to 15% viewport height */
            min-height: 120px; /* Layout safety ceiling */
            background-color: #0b111a; /* Opaque contrast surface above your #060e1e baseline */
            border-top: 1px solid rgba(255, 255, 255, 0.08);
            box-shadow: 0px -15px 40px rgba(0, 0, 0, 0.7);
            z-index: 999999;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
            color: #f0f6fc;
            box-sizing: border-box;
            transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1); /* Premium decelerating glide */
        }
        #trypcar-gold-slider.slider-glided {
            transform: translateY(-100%);
            bottom: 0;
        }
        .slider-grid-wrapper {
            max-width: 1200px;
            height: 100%;
            margin: 0 auto;
            padding: 0 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 32px;
            box-sizing: border-box;
        }
        .slider-text-pane {
            flex: 1;
        }
        .slider-tag {
            display: inline-block;
            font-size: 9px;
            font-weight: 700;
            letter-spacing: 1.5px;
            color: #2ea043; /* System emerald confirmation tag */
            margin-bottom: 4px;
        }
        .slider-text-pane h2 {
            margin: 0 0 4px 0;
            font-size: 18px;
            font-weight: 600;
            color: #ffffff;
        }
        .slider-text-pane p {
            margin: 0;
            font-size: 13px;
            line-height: 1.5;
            color: #8b949e;
        }
        .slider-anchor {
            color: #58a6ff;
            text-decoration: none;
            border-bottom: 1px dashed rgba(88, 166, 255, 0.4);
        }
        .slider-actions {
            display: flex;
            flex-direction: column;
            gap: 10px;
            min-width: 260px;
        }
        .slider-actions button {
            width: 100%;
            padding: 10px 20px;
            font-size: 13px;
            font-weight: 600;
            border-radius: 6px;
            cursor: pointer;
            box-sizing: border-box;
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .s-btn-primary {
            background-color: #21262d;
            color: #c9d1d9;
            border: 1px solid #30363d;
        }
        .s-btn-primary:hover {
            background-color: #30363d;
            border-color: #8b949e;
            color: #ffffff;
        }
        .s-btn-secondary {
            background-color: transparent;
            color: #8b949e;
            border: 1px solid transparent;
        }
        .s-btn-secondary:hover {
            color: #f0f6fc;
        }
        @media (max-width: 767px) {
            #trypcar-gold-slider { height: auto; max-height: 30vh; }
            .slider-grid-wrapper { flex-direction: column; align-items: flex-start; padding: 20px; gap: 16px; }
            .slider-actions { width: 100%; min-width: unset; }
        }
    `;
    document.head.appendChild(styleBlock);

    // 3. Dynamically Construct HTML Components Over Main Page Nodes
    const bannerContainer = document.createElement("div");
    bannerContainer.id = "trypcar-gold-slider";
    bannerContainer.innerHTML = `
        <div class="slider-grid-wrapper">
            <div class="slider-text-pane">
                <span class="slider-tag">PLATFORM UTILITY SECURITY</span>
                <h2>Data Sovereignty & Routing Transparency</h2>
                <p>
                    TrypCar processing routines handle core operational telemetry to optimize matching layers, stabilize local dispatch matrices, and update spatial device maps. Manage configurations in the <a href="legal.html" class="slider-anchor">TrypCar Security Manifest</a>.
                </p>
            </div>
            <div class="slider-actions">
                <button id="trypcar-accept-node" class="s-btn-primary">Initialize Operational Metrics</button>
                <button id="trypcar-restrict-node" class="s-btn-secondary">Restrict To Core Assets Only</button>
            </div>
        </div>
    `;
    document.body.appendChild(bannerContainer);

    // 4. Execution Timing: Handle Slide-Up Execution 600ms After Load
    setTimeout(() => {
        bannerContainer.classList.add("slider-glided");
    }, 600);

    // 5. Setup Action Listeners for Cache Storage Management
    document.getElementById("trypcar-accept-node").addEventListener("click", () => recordSetting("granted"));
    document.getElementById("trypcar-restrict-node").addEventListener("click", () => recordSetting("restricted"));

    function recordSetting(token) {
        localStorage.setItem("trypcar_privacy_manifest", token);
        bannerContainer.style.transform = "translateY(100%)"; // Smoothly glide down off-screen
    }
})();
