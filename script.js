document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generateBtn');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');
    const outputArea = document.getElementById('final_prompt');
    const form = document.getElementById('prompt-form');

    // Helper function to get the value of an input field
    const getValue = (id) => document.getElementById(id).value.trim();

    // Function to generate the prompt
    const generatePrompt = () => {
        const promptParts = [];

        // A helper to add a part to the prompt if it has a value
        const addPart = (label, value) => {
            if (value) {
                promptParts.push(`${label}: ${value}`);
            }
        };

        // Gather all values
        addPart('Shot Size', getValue('shot_size'));
        addPart('Composition', getValue('composition'));
        addPart('Camera', getValue('camera'));
        addPart('Lens Type', getValue('lens_type'));
        addPart('Focal Length', getValue('focal_length'));
        addPart('Aspect Ratio', getValue('aspect_ratio'));
        addPart('Shot Framing', getValue('shot_framing'));
        addPart('Camera Movement', getValue('camera_movement'));
        addPart('Scene Lighting', getValue('scene_lighting'));
        addPart('Weather / Natural Atmosphere', getValue('weather'));
        addPart('Environment / Setting', getValue('environment'));
        addPart('Subject (appearance & details)', getValue('subject_details'));
        addPart('Subject Action', getValue('subject_action'));
        addPart('People Density', getValue('people_density'));
        addPart('Mood / Emotional Atmosphere', getValue('mood'));
        addPart('Color Mood / Palette', getValue('color_mood'));
        addPart('Era / Styling / Cultural Influence', getValue('era_styling'));
        addPart('Visual Style / Render Engine', getValue('visual_style'));
        addPart('Texture / Surface Detail', getValue('texture_detail'));
        addPart('Motion Cues', getValue('motion_cues'));
        addPart('Film Texture / FX', getValue('film_texture_fx'));
        addPart('Negative Prompt', getValue('negative_prompt'));
        addPart('Output Specs', getValue('output_specs'));
        
        // Join all parts into a single string
        outputArea.value = promptParts.join('; ');
    };

    // Function to copy the prompt to the clipboard
    const copyPrompt = () => {
        if (outputArea.value) {
            navigator.clipboard.writeText(outputArea.value).then(() => {
                const feedback = document.getElementById('copy-feedback');
                feedback.style.display = 'block';
                setTimeout(() => {
                    feedback.style.display = 'none';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        }
    };

    // Function to clear all form fields
    const clearAll = () => {
        if (confirm('Are you sure you want to clear all fields?')) {
            form.reset();
            outputArea.value = '';
        }
    };

    // Attach event listeners
    generateBtn.addEventListener('click', generatePrompt);
    copyBtn.addEventListener('click', copyPrompt);
    clearBtn.addEventListener('click', clearAll);
});