"use strict";

//
// Data definitions corresponding to the original Python script
//

// Camera models by category. Film cameras draw from influential historical models,
// digital cameras cover popular DSLRs/mirrorless systems, phone cameras include
// early camera phones from the 2000s and modern smartphones, and other cameras
// include drones and specialty devices. Sources include descriptions of iconic
// early camera phones like the Samsung SCH‑V200, Sharp J-SH04, Sanyo SCP-5300,
// Audiovox PM8920, Nokia N90, Sony Ericsson K750i/K800i, Nokia N95 and Samsung
// INNOV8.
const FILM_CAMERAS = [
    "Daguerreotype (1839)", "The Kodak (1888)", "Kodak Brownie (1900)",
    "Graflex Speed Graphic (1912)", "Leica I (1925)", "Kine Exakta I (1936)",
    "Hasselblad 1600F (1948)", "Leica M3 (1954)", "Nikon F (1959)",
    "Canon AE-1 (1976)", "Olympus OM-1 (1973)", "Olympus OM-2 (1975)",
    "Canon T90 (1986)", "Nikon F3 (1980)", "Pentax Spotmatic (1964)"
];

const DIGITAL_CAMERAS = [
    "Kodak DCS 100 (1992)", "Canon EOS-1Ds (2002)", "Nikon D1 (1999)",
    "Canon 5D Mark II (2008)", "Nikon D3 (2007)", "Sony a7 (2013)",
    "Sony a9 (2017)", "Canon 5D Mark IV (2016)", "Nikon Z6 (2018)",
    "Fujifilm X-T4 (2020)", "Canon R5 (2020)", "Nikon Z9 (2021)", "Sony Alpha 1 (2021)"
];

const PHONE_CAMERAS = [
    "Samsung SCH-V200 (2000)", "Sharp J-SH04 (2000)", "Sanyo SCP-5300 (2002)",
    "Audiovox PM8920 (2004)", "Nokia N90 (2005)", "Sony Ericsson K750i (2005)",
    "Sony Ericsson K800i (2006)", "Nokia N95 (2007)", "Samsung INNOV8 (2008)",
    "Samsung Galaxy Note 3 (2013)", "LG G3 (2014)", "iPhone 6s (2015)",
    "iPhone 8 (2017)", "Samsung Galaxy S9 (2018)", "OnePlus 6 (2018)",
    "Samsung Galaxy S20 (2020)", "Redmi K30 Pro (2020)", "iPhone 12 Pro (2020)"
];

const OTHER_CAMERAS = [
    "GoPro HERO10 (2021)", "DJI Phantom 4 (2016)", "DJI Mavic 3 (2021)",
    "Blackmagic Pocket Cinema Camera 6K (2019)", "360° Ricoh Theta Z1 (2019)",
    "Thermal camera", "Security CCTV", "Polaroid camera"
];

// Top‑level camera categories shown in the first dropdown.  These map to the
// corresponding lists above.  Both cinema and photography categories are
// provided in analog and digital flavours.
const CAMERA_TYPES = [
    "Analog Cinema",
    "Digital Cinema",
    "Analog Photography",
    "Digital Photography",
    "Other"
];

// Lookup mapping camera type to specific camera lists.  Analog categories map
// to film cameras and digital categories map to digital cameras.  "Other"
// contains drones and speciality devices.
const CAMERAS_BY_TYPE = {
    "Analog Cinema": FILM_CAMERAS,
    "Digital Cinema": DIGITAL_CAMERAS,
    "Analog Photography": FILM_CAMERAS,
    "Digital Photography": DIGITAL_CAMERAS,
    "Other": OTHER_CAMERAS
};

// Lens focal lengths and types organised into categories.  Users select a
// lens type and then a specific lens or focal length.
const LENS_TYPES = {
    "Standard": ["24mm", "28mm", "35mm", "50mm", "85mm", "135mm"],
    "Zoom": ["18-55mm", "24-70mm", "24-105mm", "70-200mm", "100-400mm"],
    "Macro": ["Macro", "Micro"],
    "Artistic": ["Anamorphic", "Fisheye", "Tilt-shift", "Soft focus", "Lensbaby"],
    "Phone": ["Wide", "Ultra-wide", "Telephoto", "Macro", "Periscope", "Depth sensor", "Monochrome", "Front camera"],
    "Vintage": ["Vintage", "Polaroid"]
};

const FRAMINGS = ["Vertical", "Horizontal", "Square"];
const ASPECT_RATIOS = ["3:2", "4:3", "16:9", "9:16", "1:1", "2.39:1"];

// Composition rules with descriptions
const COMPOSITIONS = [
    { name: "Rule of thirds", desc: "Place key elements along the thirds of the frame" },
    { name: "Centered", desc: "Subject is centred within the frame" },
    { name: "Leading lines", desc: "Compositional lines guide the viewer's eye" },
    { name: "Negative space", desc: "Large areas of empty space around the subject" },
    { name: "Symmetry", desc: "Balanced elements mirrored across an axis" },
    { name: "Dutch angle", desc: "Frame is tilted for dynamic tension" },
    { name: "Golden ratio", desc: "Elements follow the spiral proportions of the golden ratio" },
    { name: "Frame within a frame", desc: "Use natural or architectural frames around the subject" },
    { name: "Patterns & repetition", desc: "Highlight repeating shapes or forms" },
    { name: "Minimalism", desc: "Use a simple composition with few elements" },
    { name: "Triangular composition", desc: "Arrange subjects to form a triangle for balance" }
];

// Shot sizes with descriptions
const SHOT_SIZES = [
    { name: "Extreme close-up (ECU)", desc: "Focus on a small detail like eyes or hands" },
    { name: "Close-up (CU)", desc: "Head and shoulders of a person" },
    { name: "Medium close-up (MCU)", desc: "Chest up of a person" },
    { name: "Medium shot (MS)", desc: "Waist up of a person" },
    { name: "Medium long shot (MLS)", desc: "Knees up of a person" },
    { name: "Wide shot (WS)", desc: "Full body or subject in environment" },
    { name: "Extreme wide shot (EWS)", desc: "Landscape or very wide view" },
    { name: "Cowboy shot (CS)", desc: "From mid-thigh to head of a person" },
    { name: "Full shot (FS)", desc: "Entire body of a person" },
    { name: "Establishing shot (ES)", desc: "Wide view showing context" },
    { name: "Medium wide shot (MWS)", desc: "Shows subject from knees up with some environment" },
    { name: "Over-the-shoulder (OTS)", desc: "Frame over the shoulder of a subject" },
    { name: "Point-of-view (POV)", desc: "Shows what a character sees" },
    { name: "Two-shot", desc: "Includes two subjects in a balanced composition" },
    { name: "Three-shot", desc: "Includes three subjects in the frame" },
    { name: "Group shot", desc: "Captures several subjects together" }
];

// Expanded list of camera movements
const CAMERA_MOVES = [
    { name: "Static", desc: "No camera movement" },
    { name: "Pan", desc: "Rotate horizontally from a fixed point" },
    { name: "Tilt", desc: "Rotate vertically from a fixed point" },
    { name: "Push-in", desc: "Move camera closer to subject" },
    { name: "Pull-out", desc: "Move camera away from subject" },
    { name: "Dolly", desc: "Move camera on a track towards or away" },
    { name: "Truck", desc: "Move camera sideways on a track" },
    { name: "Handheld", desc: "Unstable, free camera movement" },
    { name: "Steadicam", desc: "Smooth stabilised handheld movement" },
    { name: "Pedestal", desc: "Raise or lower camera vertically" },
    { name: "Roll", desc: "Rotate camera along the lens axis" },
    { name: "Crane", desc: "Move camera vertically using a crane or jib" },
    { name: "Aerial", desc: "High‑angle movement from a drone or helicopter" },
    { name: "Tracking shot", desc: "Follow the subject along a path" },
    { name: "Arc shot", desc: "Move around the subject in an arc" },
    { name: "Dolly zoom", desc: "Simultaneous zoom and dolly creating perspective distortion" },
    { name: "360-degree pan", desc: "Rotate the camera in a full circle" }
];

// Lighting times expanded with more specific times of day
const LIGHTING_TIMES = [
    "Golden hour", "Blue hour", "Morning", "Noon", "Afternoon", "Evening", "Night", "Dawn", "Sunrise", "Sunset", "Twilight", "Midnight", "Magic hour"
];

const WEATHERS = ["Clear", "Cloudy", "Fog", "Drizzle", "Rain", "Snow", "Haze", "Mist", "Backlit dust"];

// Colour moods extended to include additional tonal palettes
const COLOR_MOODS = [
    { name: "Warm", desc: "Emphasises reds, oranges and yellows for a cosy feel" },
    { name: "Cool", desc: "Emphasises blues and greens for a calm, detached feel" },
    { name: "Teal-orange", desc: "High contrast mix of teal shadows and orange highlights" },
    { name: "Muted", desc: "Desaturated colours for a subdued mood" },
    { name: "Monochrome", desc: "Single hue or black and white palette" },
    { name: "Vibrant", desc: "Highly saturated colours for energy and excitement" },
    { name: "Pastel", desc: "Soft, delicate colours for a dreamlike atmosphere" },
    { name: "High contrast", desc: "Strong tonal differences between light and dark areas" },
    { name: "Bleak", desc: "Desaturated and cold tones for a somber feel" },
    { name: "Colourful", desc: "Rich, varied hues with high saturation" },
    { name: "Earth tones", desc: "Browns, greens and natural hues for grounded scenes" }
];

const FILM_TEXTURES = ["35mm grain", "16mm grain", "Light leak", "Halation", "Bloom", "Chromatic aberration", "VHS", "Polaroid", "Dust & scratches", "Sepia tone", "Film burn", "Bokeh", "Sprocket holes"];

const ENVIRONMENTS = ["Urban", "Suburban", "Coastal", "Forest", "Desert", "Mountain", "Indoor", "Industrial", "Rural", "Futuristic", "Vintage"];

const ERAS_STYLES = ["1870s", "1880s", "1890s", "1900s", "1910s", "1920s", "1930s", "1940s", "1950s", "1960s", "1970s", "1980s", "1990s", "2000s", "2010s", "2020s", "Contemporary"];

// Additional motion cues to broaden expressive possibilities
const MOTION_CUES = [
    { name: "Motion blur", desc: "Subject or background blurred by movement" },
    { name: "Long exposure trails", desc: "Light streaks from long exposures" },
    { name: "Freeze action", desc: "Fast shutter to freeze motion" },
    { name: "Time-lapse", desc: "Compresses time into a short sequence" },
    { name: "Slow motion", desc: "Subject captured at high frame rate" },
    { name: "Whip pan", desc: "Rapid camera pan creating a blur" },
    { name: "Parallax", desc: "Foreground and background move at different speeds" },
    { name: "Hyper-lapse", desc: "Long distance time-lapse movement" },
    { name: "Rack focus", desc: "Shift focus between subjects" },
    { name: "Zoom", desc: "Change focal length for dramatic emphasis" },
    { name: "Stop motion", desc: "Animate through sequential still images" },
    { name: "Bullet time", desc: "Time appears to stand still while the camera moves around" },
    { name: "Glitch effect", desc: "Simulated digital artefacts and jitter" },
    { name: "Speed ramping", desc: "Sudden changes between slow and fast motion" },
    { name: "Frame skipping", desc: "Intermittent frame drops to suggest erratic motion" },
    { name: "Stroboscopic", desc: "Rapid flashes freezing motion" },
    { name: "Tilt-shift blur", desc: "Selective focus creates miniature effect" },
    { name: "Reverse motion", desc: "Subject appears to move backwards in time" }
];

const REFLECTIONS = ["Wet pavement", "Glass", "Puddles", "Neon reflections", "Metallic surfaces", "Water", "Mirrors"];
const PEOPLE_DENSITY = ["Empty", "Sparse", "Normal", "Crowded"];

// Negative prompts extended with more exclusions
const NEGATIVE_ELEMENTS = [
    { name: "No watermark", desc: "Exclude watermarks from the output" },
    { name: "No text", desc: "Exclude any text from the image" },
    { name: "No logos", desc: "Avoid brand logos or trademarks" },
    { name: "No distorted faces", desc: "Avoid unnatural face distortions" },
    { name: "No clutter", desc: "Keep the scene free of unnecessary objects" },
    { name: "No reflections", desc: "Remove unwanted reflections or glare" },
    { name: "No violence", desc: "Exclude violent or graphic content" },
    { name: "No grain", desc: "Keep the image smooth and free of film grain" },
    { name: "No background clutter", desc: "Simplify the background" }
];

// Default example presets drawn from the original Python code.  These presets
// illustrate a variety of cinematic scenes and serve as inspiration.
const DEFAULT_PRESETS = [
    {
        title: "Neo-noir alley",
        data: {
            subject: "A detective in a trench coat walks down a rain-soaked alley, cigarette smoke trailing behind.",
            camera: "Leica M3 (1954)",
            lens: "35mm",
            framing: "Horizontal",
            aspect_ratio: "16:9",
            composition: ["Leading lines"],
            shot_size: "Medium shot (MS)",
            camera_move: ["Dolly"],
            lighting: "Night",
            weather: "Rain",
            color_mood: "Cool",
            film_texture: ["35mm grain", "Light leak"],
            environment: "Urban",
            era_style: "1980s",
            motion_cues: ["Motion blur"],
            reflections: ["Wet pavement"],
            people_density: "Sparse",
            negative_elements: ["No logos", "No watermark"],
            mood: "Dark and mysterious"
        }
    },
    {
        title: "Sunset desert ride",
        data: {
            subject: "A lone motorcyclist rides across an endless desert at sunset, dust trailing behind.",
            camera: "Hasselblad 1600F (1948)",
            lens: "50mm",
            framing: "Horizontal",
            aspect_ratio: "2.39:1",
            composition: ["Rule of thirds"],
            shot_size: "Wide shot (WS)",
            camera_move: ["Handheld"],
            lighting: "Golden hour",
            weather: "Clear",
            color_mood: "Warm",
            film_texture: ["35mm grain"],
            environment: "Desert",
            era_style: "1970s",
            motion_cues: ["Long exposure trails"],
            reflections: [],
            people_density: "Empty",
            negative_elements: ["No text", "No logos"],
            mood: "Epic and solitary"
        }
    },
    {
        title: "Futuristic cityscape",
        data: {
            subject: "A drone glides between neon-lit skyscrapers in a bustling future metropolis.",
            camera: "Sony a9 (2017)",
            lens: "24-70mm",
            framing: "Horizontal",
            aspect_ratio: "16:9",
            composition: ["Symmetry"],
            shot_size: "Extreme wide shot (EWS)",
            camera_move: ["Push-in"],
            lighting: "Night",
            weather: "Fog",
            color_mood: "Teal-orange",
            film_texture: ["Halation", "Bloom"],
            environment: "Urban",
            era_style: "2020s",
            motion_cues: ["Freeze action"],
            reflections: ["Neon reflections"],
            people_density: "Crowded",
            negative_elements: ["No watermark"],
            mood: "Energetic and high-tech"
        }
    },
    {
        title: "Pastoral morning",
        data: {
            subject: "A farmer leads a herd of sheep through misty fields at dawn.",
            camera: "Pentax Spotmatic (1964)",
            lens: "85mm",
            framing: "Horizontal",
            aspect_ratio: "4:3",
            composition: ["Rule of thirds"],
            shot_size: "Wide shot (WS)",
            camera_move: ["Static"],
            lighting: "Morning",
            weather: "Mist",
            color_mood: "Muted",
            film_texture: ["16mm grain"],
            environment: "Rural",
            era_style: "1950s",
            motion_cues: ["Freeze action"],
            reflections: ["Puddles"],
            people_density: "Sparse",
            negative_elements: ["No logos", "No clutter"],
            mood: "Calm and nostalgic"
        }
    },
    {
        title: "Industrial dusk",
        data: {
            subject: "Workers leave a sprawling factory complex as smoke stacks silhouetted against the setting sun.",
            camera: "Canon AE-1 (1976)",
            lens: "28mm",
            framing: "Horizontal",
            aspect_ratio: "3:2",
            composition: ["Leading lines", "Dutch angle"],
            shot_size: "Medium long shot (MLS)",
            camera_move: ["Truck"],
            lighting: "Evening",
            weather: "Haze",
            color_mood: "Warm",
            film_texture: ["35mm grain"],
            environment: "Industrial",
            era_style: "1980s",
            motion_cues: ["Motion blur"],
            reflections: [],
            people_density: "Normal",
            negative_elements: ["No text", "No watermark"],
            mood: "Busy and gritty"
        }
    },
    {
        title: "Coastal storm",
        data: {
            subject: "A lighthouse stands firm as waves crash violently against the rocks during a storm.",
            camera: "Canon T90 (1986)",
            lens: "50mm",
            framing: "Vertical",
            aspect_ratio: "3:2",
            composition: ["Centered"],
            shot_size: "Medium shot (MS)",
            camera_move: ["Static"],
            lighting: "Afternoon",
            weather: "Rain",
            color_mood: "Cool",
            film_texture: ["Halation"],
            environment: "Coastal",
            era_style: "1990s",
            motion_cues: ["Long exposure trails"],
            reflections: ["Water"],
            people_density: "Empty",
            negative_elements: ["No logos"],
            mood: "Dramatic and resilient"
        }
    },
    {
        title: "Forest fairytale",
        data: {
            subject: "A child follows a trail of glowing mushrooms through an enchanted forest.",
            camera: "Sony a7 (2013)",
            lens: "35mm",
            framing: "Vertical",
            aspect_ratio: "9:16",
            composition: ["Negative space"],
            shot_size: "Medium close-up (MCU)",
            camera_move: ["Pull-out"],
            lighting: "Blue hour",
            weather: "Fog",
            color_mood: "Pastel",
            film_texture: ["Bloom", "Chromatic aberration"],
            environment: "Forest",
            era_style: "2000s",
            motion_cues: ["Slow motion"],
            reflections: [],
            people_density: "Sparse",
            negative_elements: ["No text", "No watermark"],
            mood: "Whimsical and magical"
        }
    },
    {
        title: "Oceanic exploration",
        data: {
            subject: "Divers swim through crystal clear water among colourful fish and coral.",
            camera: "GoPro HERO10 (2021)",
            lens: "24mm",
            framing: "Horizontal",
            aspect_ratio: "16:9",
            composition: ["Centered"],
            shot_size: "Wide shot (WS)",
            camera_move: ["Handheld"],
            lighting: "Afternoon",
            weather: "Clear",
            color_mood: "Vibrant",
            film_texture: ["Chromatic aberration"],
            environment: "Coastal",
            era_style: "2020s",
            motion_cues: ["Freeze action"],
            reflections: ["Water"],
            people_density: "Sparse",
            negative_elements: ["No logos", "No watermark"],
            mood: "Adventurous and awe-inspiring"
        }
    },
    {
        title: "Suburban night drive",
        data: {
            subject: "A teenager drives a vintage car through a quiet suburban neighbourhood at night, street lights reflecting off the hood.",
            camera: "Nikon F2 (1971)",
            lens: "50mm",
            framing: "Horizontal",
            aspect_ratio: "16:9",
            composition: ["Centered", "Leading lines"],
            shot_size: "Medium shot (MS)",
            camera_move: ["Truck"],
            lighting: "Night",
            weather: "Clear",
            color_mood: "Muted",
            film_texture: ["35mm grain"],
            environment: "Suburban",
            era_style: "1990s",
            motion_cues: ["Motion blur"],
            reflections: ["Wet pavement"],
            people_density: "Sparse",
            negative_elements: ["No text", "No logos"],
            mood: "Melancholic and reflective"
        }
    },
    {
        title: "Rural carnival",
        data: {
            subject: "Children ride a brightly lit Ferris wheel at a small town carnival at dusk.",
            camera: "Fujifilm X100V (2020)",
            lens: "23mm",
            framing: "Horizontal",
            aspect_ratio: "3:2",
            composition: ["Symmetry", "Leading lines"],
            shot_size: "Medium long shot (MLS)",
            camera_move: ["Static"],
            lighting: "Evening",
            weather: "Clear",
            color_mood: "Vibrant",
            film_texture: ["35mm grain"],
            environment: "Rural",
            era_style: "2010s",
            motion_cues: ["Long exposure trails"],
            reflections: [],
            people_density: "Crowded",
            negative_elements: ["No logos"],
            mood: "Joyful and nostalgic"
        }
    }
];

// Utility function: join an array into a human‑readable list
function formatList(arr) {
    if (!arr || arr.length === 0) return "";
    if (arr.length === 1) return arr[0];
    const allButLast = arr.slice(0, arr.length - 1);
    return allButLast.join(", ") + " and " + arr[arr.length - 1];
}

// Populate camera type dropdown
function populateCameraType() {
    const typeSel = document.getElementById('camera_type');
    typeSel.innerHTML = '';
    const none = document.createElement('option');
    none.value = '';
    none.textContent = 'None';
    typeSel.appendChild(none);
    CAMERA_TYPES.forEach(type => {
        const opt = document.createElement('option');
        opt.value = type;
        opt.textContent = type;
        typeSel.appendChild(opt);
    });
}

// Populate camera model dropdown based on selected type
function populateCameraOptions(type) {
    const camSel = document.getElementById('camera');
    camSel.innerHTML = '';
    const noneOpt = document.createElement('option');
    noneOpt.value = '';
    noneOpt.textContent = 'None';
    camSel.appendChild(noneOpt);
    if (!type || !CAMERAS_BY_TYPE[type]) return;
    CAMERAS_BY_TYPE[type].forEach(item => {
        const opt = document.createElement('option');
        opt.value = item;
        opt.textContent = item;
        camSel.appendChild(opt);
    });
}

// Populate lens type dropdown
function populateLensType() {
    const typeSel = document.getElementById('lens_type');
    typeSel.innerHTML = '';
    const none = document.createElement('option');
    none.value = '';
    none.textContent = 'None';
    typeSel.appendChild(none);
    Object.keys(LENS_TYPES).forEach(type => {
        const opt = document.createElement('option');
        opt.value = type;
        opt.textContent = type;
        typeSel.appendChild(opt);
    });
}

// Populate lens focal lengths or names based on selected lens type
function populateLensOptions(type) {
    const lensSel = document.getElementById('lens');
    lensSel.innerHTML = '';
    const none = document.createElement('option');
    none.value = '';
    none.textContent = 'None';
    lensSel.appendChild(none);
    if (!type || !LENS_TYPES[type]) return;
    LENS_TYPES[type].forEach(item => {
        const opt = document.createElement('option');
        opt.value = item;
        opt.textContent = item;
        lensSel.appendChild(opt);
    });
}

// Build a group of checkboxes for negative prompts
function populateNegativeCheckboxes() {
    const container = document.getElementById('negative-checkboxes');
    if (!container) return;
    container.innerHTML = '';
    NEGATIVE_ELEMENTS.forEach(item => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = item.name;
        // Use title attribute to show description on hover
        checkbox.title = item.desc;
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(' ' + item.name));
        label.style.marginRight = '8px';
        container.appendChild(label);
    });
}

// Populate dropdowns and multi-select lists with simple string options
function populateSelect(id, options) {
    const select = document.getElementById(id);
    select.innerHTML = '';
    // Always include a None option
    const noneOption = document.createElement('option');
    noneOption.value = '';
    noneOption.textContent = 'None';
    select.appendChild(noneOption);
    if (Array.isArray(options)) {
        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt;
            option.textContent = opt;
            select.appendChild(option);
        });
    }
}

// Populate dropdowns with objects that have tooltip descriptions
function populateSelectWithTooltip(id, items) {
    const select = document.getElementById(id);
    select.innerHTML = '';
    // Include a None option
    const noneOption = document.createElement('option');
    noneOption.value = '';
    noneOption.textContent = 'None';
    noneOption.title = 'No selection';
    select.appendChild(noneOption);
    items.forEach(item => {
        const option = document.createElement('option');
        option.value = item.name;
        option.textContent = item.name;
        option.title = item.desc;
        select.appendChild(option);
    });
}

// Load presets from localStorage; if none, insert default presets
function getPresets() {
    const saved = localStorage.getItem('prompt_presets');
    let presets = [];
    if (saved) {
        try {
            presets = JSON.parse(saved);
        } catch (e) {
            presets = [];
        }
    }
    if (presets.length < DEFAULT_PRESETS.length) {
        // Merge default presets that aren't already stored
        const existingTitles = new Set(presets.map(p => p.title));
        DEFAULT_PRESETS.forEach(preset => {
            if (!existingTitles.has(preset.title)) {
                presets.push(preset);
            }
        });
        // Save merged presets
        localStorage.setItem('prompt_presets', JSON.stringify(presets));
    }
    return presets;
}

// Refresh preset dropdown options
function refreshPresetSelect() {
    const presetSelect = document.getElementById('preset_select');
    const presets = getPresets();
    presetSelect.innerHTML = "";
    presets.forEach((preset, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = preset.title;
        presetSelect.appendChild(option);
    });
}

// Fill form fields with preset data
function loadPreset(index) {
    const presets = getPresets();
    if (index < 0 || index >= presets.length) return;
    const data = presets[index].data;
    // Subject
    document.getElementById('subject').value = data.subject || '';
    // Rebuild camera and lens lists and assign values
    populateCameraType();
    populateLensType();
    // Determine camera type from stored camera model
    let camType = '';
    if (data.camera) {
        for (const [type, list] of Object.entries(CAMERAS_BY_TYPE)) {
            if (list.includes(data.camera)) { camType = type; break; }
        }
    }
    document.getElementById('camera_type').value = camType || '';
    populateCameraOptions(camType || '');
    document.getElementById('camera').value = data.camera || '';
    // Determine lens type from stored lens
    let lensType = '';
    if (data.lens) {
        for (const [type, list] of Object.entries(LENS_TYPES)) {
            if (list.includes(data.lens)) { lensType = type; break; }
        }
    }
    document.getElementById('lens_type').value = lensType || '';
    populateLensOptions(lensType || '');
    document.getElementById('lens').value = data.lens || '';
    // Framing and aspect ratio
    document.getElementById('framing').value = data.framing || '';
    document.getElementById('aspect_ratio').value = data.aspect_ratio || '';
    // Composition
    const compSel = document.getElementById('composition');
    for (let i = 0; i < compSel.options.length; i++) {
        compSel.options[i].selected = false;
    }
    if (Array.isArray(data.composition)) {
        data.composition.forEach(item => {
            for (let i = 0; i < compSel.options.length; i++) {
                if (compSel.options[i].value === item) compSel.options[i].selected = true;
            }
        });
    }
    document.getElementById('compositionDetails').value = data.compositionDetails || '';
    // Shot size
    document.getElementById('shot_size').value = data.shot_size || '';
    document.getElementById('shotSizeDetails').value = data.shotSizeDetails || '';
    // Camera move
    const cmSel = document.getElementById('camera_move');
    for (let i = 0; i < cmSel.options.length; i++) {
        cmSel.options[i].selected = false;
    }
    if (Array.isArray(data.camera_move)) {
        data.camera_move.forEach(item => {
            for (let i = 0; i < cmSel.options.length; i++) {
                if (cmSel.options[i].value === item) cmSel.options[i].selected = true;
            }
        });
    }
    document.getElementById('cameraMoveDetails').value = data.cameraMoveDetails || '';
    // Lighting and weather
    document.getElementById('lighting').value = data.lighting || '';
    document.getElementById('lightingDetails').value = data.lightingDetails || '';
    document.getElementById('weather').value = data.weather || '';
    document.getElementById('weatherDetails').value = data.weatherDetails || '';
    // Colour mood
    document.getElementById('color_mood').value = data.color_mood || '';
    document.getElementById('colorMoodDetails').value = data.colorMoodDetails || '';
    // Film texture
    const ftSel = document.getElementById('film_texture');
    for (let i = 0; i < ftSel.options.length; i++) {
        ftSel.options[i].selected = false;
    }
    if (Array.isArray(data.film_texture)) {
        data.film_texture.forEach(item => {
            for (let i = 0; i < ftSel.options.length; i++) {
                if (ftSel.options[i].value === item) ftSel.options[i].selected = true;
            }
        });
    }
    document.getElementById('filmTextureDetails').value = data.filmTextureDetails || '';
    // Environment
    document.getElementById('environment').value = data.environment || '';
    document.getElementById('environmentDetails').value = data.environmentDetails || '';
    // Era/style
    document.getElementById('era_style').value = data.era_style || '';
    document.getElementById('eraStyleDetails').value = data.eraStyleDetails || '';
    // Motion cues
    const mcSel = document.getElementById('motion_cues');
    for (let i = 0; i < mcSel.options.length; i++) {
        mcSel.options[i].selected = false;
    }
    if (Array.isArray(data.motion_cues)) {
        data.motion_cues.forEach(item => {
            for (let i = 0; i < mcSel.options.length; i++) {
                if (mcSel.options[i].value === item) mcSel.options[i].selected = true;
            }
        });
    }
    document.getElementById('motionCuesDetails').value = data.motionCuesDetails || '';
    // Reflections
    const refSel = document.getElementById('reflections');
    for (let i = 0; i < refSel.options.length; i++) {
        refSel.options[i].selected = false;
    }
    if (Array.isArray(data.reflections)) {
        data.reflections.forEach(item => {
            for (let i = 0; i < refSel.options.length; i++) {
                if (refSel.options[i].value === item) refSel.options[i].selected = true;
            }
        });
    }
    document.getElementById('reflectionsDetails').value = data.reflectionsDetails || '';
    // People density
    document.getElementById('people_density').value = data.people_density || '';
    document.getElementById('peopleDensityDetails').value = data.peopleDensityDetails || '';
    // Negative elements
    document.querySelectorAll('#negative-checkboxes input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    if (Array.isArray(data.negative_elements)) {
        data.negative_elements.forEach(item => {
            document.querySelectorAll('#negative-checkboxes input[type="checkbox"]').forEach(cb => {
                if (cb.value === item) cb.checked = true;
            });
        });
    }
    document.getElementById('negativeDetails').value = data.negativeDetails || '';
    // Mood
    document.querySelectorAll('#mood-checkboxes input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    if (data.mood) {
        // If mood string matches checkbox values, check them; otherwise store as details
        const moods = Array.isArray(data.mood) ? data.mood : data.mood.split(/,\s*/);
        moods.forEach(m => {
            const cb = Array.from(document.querySelectorAll('#mood-checkboxes input[type="checkbox"]')).find(c => c.value.toLowerCase() === m.toLowerCase());
            if (cb) cb.checked = true;
        });
        // Clear mood details if match; else assign to moodDetails
        document.getElementById('moodDetails').value = data.moodDetails || '';
    }
    // Generate preview after loading preset
    generatePrompt();
}

// Generate a prompt by assembling the selected options in a fixed order
function generatePrompt() {
    const subject = document.getElementById('subject').value.trim();
    // Mood checkboxes
    const moodCheckboxes = document.querySelectorAll('#mood-checkboxes input[type="checkbox"]:checked');
    const moodValues = Array.from(moodCheckboxes).map(cb => cb.value);
    const moodDetails = document.getElementById('moodDetails').value.trim();
    const camera = document.getElementById('camera').value;
    const lens = document.getElementById('lens').value;
    const framing = document.getElementById('framing').value;
    const aspect = document.getElementById('aspect_ratio').value;
    let composition = Array.from(document.getElementById('composition').selectedOptions).map(opt => opt.value).filter(v => v);
    const compositionDetails = document.getElementById('compositionDetails').value.trim();
    if (compositionDetails) composition.push(compositionDetails);
    const shotSize = document.getElementById('shot_size').value;
    const shotSizeDetails = document.getElementById('shotSizeDetails').value.trim();
    const cameraMoves = Array.from(document.getElementById('camera_move').selectedOptions).map(opt => opt.value).filter(v => v);
    const cameraMoveDetails = document.getElementById('cameraMoveDetails').value.trim();
    const lighting = document.getElementById('lighting').value;
    const lightingDetails = document.getElementById('lightingDetails').value.trim();
    const weather = document.getElementById('weather').value;
    const weatherDetails = document.getElementById('weatherDetails').value.trim();
    const colorMood = document.getElementById('color_mood').value;
    const colorMoodDetails = document.getElementById('colorMoodDetails').value.trim();
    const filmTexture = Array.from(document.getElementById('film_texture').selectedOptions).map(opt => opt.value).filter(v => v);
    const filmTextureDetails = document.getElementById('filmTextureDetails').value.trim();
    const environment = document.getElementById('environment').value;
    const environmentDetails = document.getElementById('environmentDetails').value.trim();
    const eraStyle = document.getElementById('era_style').value;
    const eraStyleDetails = document.getElementById('eraStyleDetails').value.trim();
    const motionCues = Array.from(document.getElementById('motion_cues').selectedOptions).map(opt => opt.value).filter(v => v);
    const motionCuesDetails = document.getElementById('motionCuesDetails').value.trim();
    const reflections = Array.from(document.getElementById('reflections').selectedOptions).map(opt => opt.value).filter(v => v);
    const reflectionsDetails = document.getElementById('reflectionsDetails').value.trim();
    const peopleDensity = document.getElementById('people_density').value;
    const peopleDensityDetails = document.getElementById('peopleDensityDetails').value.trim();
    const negativeElements = Array.from(document.querySelectorAll('#negative-checkboxes input[type="checkbox"]:checked')).map(cb => cb.value);
    const negativeDetails = document.getElementById('negativeDetails').value.trim();

    const parts = [];
    // 1. Shot size
    if ((shotSize && shotSize !== 'None') || shotSizeDetails) {
        let ssStr = '';
        if (shotSize && shotSize !== 'None') ssStr += shotSize;
        if (shotSizeDetails) ssStr += (ssStr ? ' (' : '') + shotSizeDetails + (ssStr ? ')' : '');
        parts.push(`Shot size: ${ssStr}.`);
    }
    // 2. Composition
    if (composition.length > 0) {
        parts.push(`Composition: ${formatList(composition)}.`);
    }
    // 3. Subject/action
    if (subject) {
        const capSubject = subject.charAt(0).toUpperCase() + subject.slice(1);
        parts.push(`Subject/action: ${capSubject}`);
    }
    // 4. Camera
    if (camera) {
        parts.push(`Camera: ${camera}.`);
    }
    // 5. Lens
    if (lens) {
        parts.push(`Lens/focal length: ${lens}.`);
    }
    // 6. Lighting time
    if ((lighting && lighting !== 'None') || lightingDetails) {
        let ltStr = '';
        if (lighting && lighting !== 'None') ltStr += lighting;
        if (lightingDetails) ltStr += (ltStr ? ' (' : '') + lightingDetails + (ltStr ? ')' : '');
        parts.push(`Lighting time: ${ltStr}.`);
    }
    // 7. Mood / Atmosphere
    if (moodValues.length > 0 || moodDetails) {
        let moodStr = '';
        if (moodValues.length > 0) moodStr += formatList(moodValues);
        if (moodDetails) moodStr += (moodStr ? ' (' : '') + moodDetails + (moodStr ? ')' : '');
        parts.push(`Mood/atmosphere: ${moodStr}.`);
    }
    // 8. Weather / Atmosphere
    if ((weather && weather !== 'None') || weatherDetails) {
        let wStr = '';
        if (weather && weather !== 'None') wStr += weather;
        if (weatherDetails) wStr += (wStr ? ' (' : '') + weatherDetails + (wStr ? ')' : '');
        parts.push(`Weather/atmosphere: ${wStr}.`);
    }
    // 9. Colour mood
    if ((colorMood && colorMood !== 'None') || colorMoodDetails) {
        let cmStr = '';
        if (colorMood && colorMood !== 'None') cmStr += colorMood;
        if (colorMoodDetails) cmStr += (cmStr ? ' (' : '') + colorMoodDetails + (cmStr ? ')' : '');
        parts.push(`Colour mood: ${cmStr}.`);
    }
    // 10. People density
    if ((peopleDensity && peopleDensity !== 'None') || peopleDensityDetails) {
        let pdStr = '';
        if (peopleDensity && peopleDensity !== 'None') pdStr += peopleDensity;
        if (peopleDensityDetails) pdStr += (pdStr ? ' (' : '') + peopleDensityDetails + (pdStr ? ')' : '');
        parts.push(`People density: ${pdStr}.`);
    }
    // 11. Era / styling
    if ((eraStyle && eraStyle !== 'None') || eraStyleDetails) {
        let eraStr = '';
        if (eraStyle && eraStyle !== 'None') eraStr += eraStyle;
        if (eraStyleDetails) eraStr += (eraStr ? ' (' : '') + eraStyleDetails + (eraStr ? ')' : '');
        parts.push(`Era/styling: ${eraStr}.`);
    }
    // 12. Environment
    if ((environment && environment !== 'None') || environmentDetails) {
        let envStr = '';
        if (environment && environment !== 'None') envStr += environment;
        if (environmentDetails) envStr += (envStr ? ' (' : '') + environmentDetails + (envStr ? ')' : '');
        parts.push(`Environment: ${envStr}.`);
    }
    // 13. Camera movement
    if (cameraMoves.length > 0 || cameraMoveDetails) {
        let cmStr = '';
        if (cameraMoves.length > 0) cmStr += formatList(cameraMoves);
        if (cameraMoveDetails) cmStr += (cmStr ? ' (' : '') + cameraMoveDetails + (cmStr ? ')' : '');
        parts.push(`Camera movement: ${cmStr}.`);
    }
    // 14. Film texture
    if (filmTexture.length > 0 || filmTextureDetails) {
        let ftStr = '';
        if (filmTexture.length > 0) ftStr += formatList(filmTexture);
        if (filmTextureDetails) ftStr += (ftStr ? ' (' : '') + filmTextureDetails + (ftStr ? ')' : '');
        parts.push(`Film texture: ${ftStr}.`);
    }
    // 15. Motion cues
    if (motionCues.length > 0 || motionCuesDetails) {
        let mcStr = '';
        if (motionCues.length > 0) mcStr += formatList(motionCues);
        if (motionCuesDetails) mcStr += (mcStr ? ' (' : '') + motionCuesDetails + (mcStr ? ')' : '');
        parts.push(`Motion cues: ${mcStr}.`);
    }
    // 16. Reflections / surfaces
    if (reflections.length > 0 || reflectionsDetails) {
        let refStr = '';
        if (reflections.length > 0) refStr += formatList(reflections);
        if (reflectionsDetails) refStr += (refStr ? ' (' : '') + reflectionsDetails + (refStr ? ')' : '');
        parts.push(`Reflections/surfaces: ${refStr}.`);
    }
    // 17. Shot framing
    if (framing && framing !== 'None') {
        parts.push(`Shot framing: ${framing}.`);
    }
    // 18. Aspect ratio
    if (aspect && aspect !== 'None') {
        parts.push(`Aspect ratio: ${aspect}.`);
    }
    // 19. Negative elements
    if (negativeElements.length > 0 || negativeDetails) {
        let negStr = '';
        if (negativeElements.length > 0) negStr += formatList(negativeElements);
        if (negativeDetails) negStr += (negStr ? ' (' : '') + negativeDetails + (negStr ? ')' : '');
        parts.push(`Negative prompts: ${negStr}.`);
    }
    const result = parts.join(' ');
    document.getElementById('output').value = result.trim();
    return result;
}

// Copy prompt to clipboard with fallback and animation
function copyPrompt() {
    const output = document.getElementById('output').value;
    if (!output) return;
    const msg = document.getElementById('copyMessage');
    const check = document.getElementById('copyCheck');
    const showSuccess = () => {
        msg.style.display = 'inline';
        check.style.display = 'inline';
        setTimeout(() => {
            msg.style.display = 'none';
            check.style.display = 'none';
        }, 3000);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(output).then(showSuccess).catch(err => {
            console.error('Copy failed via clipboard API:', err);
            // Fallback to execCommand
            const temp = document.createElement('textarea');
            temp.value = output;
            document.body.appendChild(temp);
            temp.select();
            try {
                document.execCommand('copy');
                showSuccess();
            } catch (e) {
                console.error('Copy failed via execCommand:', e);
            }
            document.body.removeChild(temp);
        });
    } else {
        // Fallback for older browsers or insecure contexts
        const temp = document.createElement('textarea');
        temp.value = output;
        document.body.appendChild(temp);
        temp.select();
        try {
            document.execCommand('copy');
            showSuccess();
        } catch (e) {
            console.error('Copy failed via execCommand:', e);
        }
        document.body.removeChild(temp);
    }
}

// Save current configuration as a preset
function savePreset() {
    const name = document.getElementById('preset_name').value.trim();
    if (!name) {
        alert('Please enter a preset name before saving.');
        return;
    }
    // Assemble data for preset
    // First generate the prompt to ensure mood string and other derived data are captured
    const subject = document.getElementById('subject').value.trim();
    const moodCheckboxes = document.querySelectorAll('#mood-checkboxes input[type="checkbox"]:checked');
    const moodValues = Array.from(moodCheckboxes).map(cb => cb.value);
    const moodDetails = document.getElementById('moodDetails').value.trim();
    let moodStr = '';
    if (moodValues.length > 0) moodStr += formatList(moodValues);
    if (moodDetails) moodStr += (moodStr ? ' (' : '') + moodDetails + (moodStr ? ')' : '');
    const data = {
        subject: subject,
        camera: document.getElementById('camera').value || '',
        lens: document.getElementById('lens').value || '',
        framing: document.getElementById('framing').value || '',
        aspect_ratio: document.getElementById('aspect_ratio').value || '',
        composition: Array.from(document.getElementById('composition').selectedOptions).map(o => o.value).filter(v => v),
        shot_size: document.getElementById('shot_size').value || '',
        camera_move: Array.from(document.getElementById('camera_move').selectedOptions).map(o => o.value).filter(v => v),
        lighting: document.getElementById('lighting').value || '',
        weather: document.getElementById('weather').value || '',
        color_mood: document.getElementById('color_mood').value || '',
        film_texture: Array.from(document.getElementById('film_texture').selectedOptions).map(o => o.value).filter(v => v),
        environment: document.getElementById('environment').value || '',
        era_style: document.getElementById('era_style').value || '',
        motion_cues: Array.from(document.getElementById('motion_cues').selectedOptions).map(o => o.value).filter(v => v),
        reflections: Array.from(document.getElementById('reflections').selectedOptions).map(o => o.value).filter(v => v),
        people_density: document.getElementById('people_density').value || '',
        negative_elements: Array.from(document.querySelectorAll('#negative-checkboxes input[type="checkbox"]:checked')).map(cb => cb.value),
        mood: moodStr
    };
    // Preserve details fields separately
    data.compositionDetails = document.getElementById('compositionDetails').value.trim();
    data.shotSizeDetails = document.getElementById('shotSizeDetails').value.trim();
    data.cameraMoveDetails = document.getElementById('cameraMoveDetails').value.trim();
    data.lightingDetails = document.getElementById('lightingDetails').value.trim();
    data.weatherDetails = document.getElementById('weatherDetails').value.trim();
    data.colorMoodDetails = document.getElementById('colorMoodDetails').value.trim();
    data.filmTextureDetails = document.getElementById('filmTextureDetails').value.trim();
    data.environmentDetails = document.getElementById('environmentDetails').value.trim();
    data.eraStyleDetails = document.getElementById('eraStyleDetails').value.trim();
    data.motionCuesDetails = document.getElementById('motionCuesDetails').value.trim();
    data.reflectionsDetails = document.getElementById('reflectionsDetails').value.trim();
    data.peopleDensityDetails = document.getElementById('peopleDensityDetails').value.trim();
    data.negativeDetails = document.getElementById('negativeDetails').value.trim();
    // Load existing presets
    const presets = getPresets();
    // Check for duplicate title
    const exists = presets.find(p => p.title.toLowerCase() === name.toLowerCase());
    if (exists) {
        if (!confirm('A preset with this name already exists. Replace it?')) {
            return;
        }
        // Replace the existing preset
        exists.data = data;
    } else {
        // Add new preset
        presets.push({ title: name, data });
    }
    // Persist to localStorage
    localStorage.setItem('prompt_presets', JSON.stringify(presets));
    // Refresh the dropdown
    refreshPresetSelect();
    // Clear preset name field
    document.getElementById('preset_name').value = '';
    alert('Preset saved.');
}

// Clear all selections and inputs with confirmation
function clearForm() {
    if (!confirm('Are you sure you want to clear all inputs?')) return;
    // Reset subject and mood details
    document.getElementById('subject').value = '';
    document.getElementById('moodDetails').value = '';
    // Uncheck mood checkboxes
    document.querySelectorAll('#mood-checkboxes input[type="checkbox"]').forEach(cb => { cb.checked = false; });
    // Reset camera and lens selects via our populate functions
    populateCameraType();
    populateLensType();
    populateCameraOptions('');
    populateLensOptions('');
    // Explicitly select the "None" option for both type and model selects
    const camTypeSel = document.getElementById('camera_type');
    if (camTypeSel) camTypeSel.selectedIndex = 0;
    const camSel = document.getElementById('camera');
    if (camSel) camSel.selectedIndex = 0;
    const lensTypeSel = document.getElementById('lens_type');
    if (lensTypeSel) lensTypeSel.selectedIndex = 0;
    const lensSel = document.getElementById('lens');
    if (lensSel) lensSel.selectedIndex = 0;
    // Reset other selects
    ['framing','aspect_ratio','lighting','weather','color_mood','environment','era_style','people_density'].forEach(id => {
        const sel = document.getElementById(id);
        if (sel) sel.selectedIndex = 0;
    });
    // Reset multi-selects
    ['composition','shot_size','camera_move','motion_cues','reflections','film_texture'].forEach(id => {
        const sel = document.getElementById(id);
        if (sel) {
            for (let i = 0; i < sel.options.length; i++) {
                sel.options[i].selected = false;
            }
            if (sel.options.length > 0 && sel.options[0].value === '') {
                sel.options[0].selected = true;
            }
        }
    });
    // Uncheck negative elements
    document.querySelectorAll('#negative-checkboxes input[type="checkbox"]').forEach(cb => { cb.checked = false; });
    // Reset details fields
    ['lightingDetails','weatherDetails','colorMoodDetails','filmTextureDetails','environmentDetails','eraStyleDetails','motionCuesDetails','reflectionsDetails','peopleDensityDetails','negativeDetails','compositionDetails','shotSizeDetails','cameraMoveDetails'].forEach(id => {
        const input = document.getElementById(id);
        if (input) input.value = '';
    });
    // Clear output and hide copy message and check
    document.getElementById('output').value = '';
    document.getElementById('copyMessage').style.display = 'none';
    document.getElementById('copyCheck').style.display = 'none';
}

// Export presets to a JSON file for download
function exportPresets() {
    const presets = getPresets();
    const blob = new Blob([JSON.stringify(presets, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cineprompt-presets.json';
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }, 0);
}

// Import presets from a JSON file selected by the user
function importPresets(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
        try {
            const data = JSON.parse(reader.result);
            if (Array.isArray(data)) {
                localStorage.setItem('prompt_presets', JSON.stringify(data));
                refreshPresetSelect();
                alert('Presets imported successfully.');
            } else {
                alert('Invalid presets file.');
            }
        } catch (e) {
            alert('Failed to import presets: ' + e.message);
        }
    };
    reader.readAsText(file);
    // Reset the input so the same file can be selected again if needed
    event.target.value = '';
}

// Attach live preview: update the prompt whenever a relevant field changes
function attachLivePreview() {
    const fields = document.querySelectorAll('select, input[type="text"], textarea, input[type="checkbox"]');
    fields.forEach(el => {
        const handler = () => generatePrompt();
        el.addEventListener('change', handler);
        el.addEventListener('input', handler);
    });
}

// Initialise the form and bind events
window.addEventListener('DOMContentLoaded', () => {
    // Populate camera and lens selects with nested types
    populateCameraType();
    populateCameraOptions('');
    populateLensType();
    populateLensOptions('');
    // Populate the rest of the dropdowns and lists
    populateSelect('framing', FRAMINGS);
    populateSelect('aspect_ratio', ASPECT_RATIOS);
    populateSelectWithTooltip('composition', COMPOSITIONS);
    populateSelectWithTooltip('shot_size', SHOT_SIZES);
    populateSelectWithTooltip('camera_move', CAMERA_MOVES);
    populateSelect('lighting', LIGHTING_TIMES);
    populateSelect('weather', WEATHERS);
    populateSelectWithTooltip('color_mood', COLOR_MOODS);
    // Film texture multi-select
    const filmTextureSelect = document.getElementById('film_texture');
    filmTextureSelect.innerHTML = '';
    const ftNone = document.createElement('option');
    ftNone.value = '';
    ftNone.textContent = 'None';
    filmTextureSelect.appendChild(ftNone);
    FILM_TEXTURES.forEach(item => {
        const opt = document.createElement('option');
        opt.value = item;
        opt.textContent = item;
        filmTextureSelect.appendChild(opt);
    });
    populateSelect('environment', ENVIRONMENTS);
    populateSelect('era_style', ERAS_STYLES);
    populateSelectWithTooltip('motion_cues', MOTION_CUES);
    populateSelect('reflections', REFLECTIONS);
    populateSelect('people_density', PEOPLE_DENSITY);
    // Build negative element checkboxes instead of multi-select
    populateNegativeCheckboxes();
    // Load presets into dropdown
    refreshPresetSelect();
    // Event listeners for nested selects
    document.getElementById('camera_type').addEventListener('change', (e) => {
        populateCameraOptions(e.target.value);
    });
    document.getElementById('lens_type').addEventListener('change', (e) => {
        populateLensOptions(e.target.value);
    });
    // Event listeners for buttons
    document.getElementById('generateBtn').addEventListener('click', generatePrompt);
    document.getElementById('copyBtn').addEventListener('click', copyPrompt);
    document.getElementById('clearBtn').addEventListener('click', clearForm);
    document.getElementById('loadPresetBtn').addEventListener('click', () => {
        const index = parseInt(document.getElementById('preset_select').value);
        if (!isNaN(index)) loadPreset(index);
    });
    document.getElementById('savePresetBtn').addEventListener('click', savePreset);
    // Export and import presets
    document.getElementById('exportPresetsBtn').addEventListener('click', exportPresets);
    const importFileInput = document.getElementById('importFileInput');
    document.getElementById('importPresetsBtn').addEventListener('click', () => {
        importFileInput.click();
    });
    importFileInput.addEventListener('change', importPresets);
    // Keyboard shortcuts: Ctrl+Enter to generate, Ctrl+C to copy
    document.addEventListener('keydown', (event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
            generatePrompt();
            event.preventDefault();
        }
        if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'c') {
            copyPrompt();
            event.preventDefault();
        }
    });
    // Auto-resize subject textarea as the user types
    const subjectTextarea = document.getElementById('subject');
    if (subjectTextarea) {
        const autoResize = () => {
            subjectTextarea.style.height = 'auto';
            subjectTextarea.style.height = (subjectTextarea.scrollHeight + 2) + 'px';
        };
        autoResize();
        subjectTextarea.addEventListener('input', autoResize);
    }
    // Attach live preview so the output updates automatically
    attachLivePreview();
    // Generate an initial empty prompt to clear fields
    generatePrompt();
});