// ── ENHANCED STARS & CONSTELLATIONS & GALAXIES BACKGROUND ─────────────────────────────────
(function() {
    const canvas = document.createElement('canvas');
    canvas.id = 'stars-canvas';
    document.body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        initStars();
        initGalaxies();
    });

    const STAR_COLORS = ['#ffffff', '#ffffff', '#fffef0', '#fff8e7', '#ffe4b5', '#ffd700', '#ffec8b', '#e8e6e1', '#f0f0f0'];
    const STAR_COUNT = 280;
    const CONNECTION_DISTANCE = 120;
    const MAX_CONNECTIONS = 4;

    let stars = [];
    let galaxies = [];
    let mouse = { x: null, y: null };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;
    });

    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Star {
        constructor() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.size = Math.random() * 2.5 + 0.5;
            this.color = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
            this.baseAlpha = Math.random() * 0.6 + 0.4;
            this.alpha = this.baseAlpha;
            this.pulse = Math.random() * Math.PI * 2;
            this.pulseSpeed = Math.random() * 0.025 + 0.015;
            this.vx = (Math.random() - 0.5) * 0.15;
            this.vy = (Math.random() - 0.5) * 0.15;
        }

        update() {
            this.pulse += this.pulseSpeed;
            this.alpha = this.baseAlpha + Math.sin(this.pulse) * 0.25;
            if (this.alpha < 0.2) this.alpha = 0.2;
            if (this.alpha > 1) this.alpha = 1;

            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0) this.x = W;
            if (this.x > W) this.x = 0;
            if (this.y < 0) this.y = H;
            if (this.y > H) this.y = 0;

            if (mouse.x != null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 180) {
                    this.alpha = Math.min(1, this.alpha + 0.4);
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.globalAlpha = this.alpha;
            ctx.fill();
            ctx.globalAlpha = 1;

            if (this.size > 1.2) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
                gradient.addColorStop(0, this.color + '60');
                gradient.addColorStop(0.5, this.color + '20');
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fill();
            }
        }
    }

    class Galaxy {
        constructor() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.radius = Math.random() * 80 + 60;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.002;
            this.starCount = Math.floor(Math.random() * 40 + 30);
            this.stars = [];
            this.armCount = Math.floor(Math.random() * 2 + 3);

            for (let i = 0; i < this.starCount; i++) {
                const arm = i % this.armCount;
                const armOffset = (arm / this.armCount) * Math.PI * 2;
                const distance = Math.pow(Math.random(), 0.5) * this.radius;
                const angle = armOffset + (distance / this.radius) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;

                this.stars.push({
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    size: Math.random() * 1.5 + 0.3,
                    alpha: Math.random() * 0.4 + 0.3,
                    pulse: Math.random() * Math.PI * 2
                });
            }
        }

        update() {
            this.rotation += this.rotationSpeed;
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);

            const centerGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius);
            centerGrad.addColorStop(0, 'rgba(201, 168, 76, 0.15)');
            centerGrad.addColorStop(0.4, 'rgba(201, 168, 76, 0.08)');
            centerGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = centerGrad;
            ctx.beginPath();
            ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
            ctx.fill();

            this.stars.forEach(star => {
                star.pulse += 0.02;
                const alpha = star.alpha + Math.sin(star.pulse) * 0.15;

                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 248, 231, ' + Math.max(0.1, alpha) + ')';
                ctx.fill();
            });

            ctx.restore();
        }
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push(new Star());
        }
    }

    function initGalaxies() {
        galaxies = [];
        const galaxyCount = Math.floor(Math.random() * 2 + 2);
        for (let i = 0; i < galaxyCount; i++) {
            galaxies.push(new Galaxy());
        }
    }

    function drawConstellations() {
        for (let i = 0; i < stars.length; i++) {
            let connections = 0;
            for (let j = i + 1; j < stars.length; j++) {
                const dx = stars[i].x - stars[j].x;
                const dy = stars[i].y - stars[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < CONNECTION_DISTANCE && connections < MAX_CONNECTIONS) {
                    ctx.beginPath();
                    ctx.moveTo(stars[i].x, stars[i].y);
                    ctx.lineTo(stars[j].x, stars[j].y);
                    const alpha = (1 - distance / CONNECTION_DISTANCE) * 0.4;
                    ctx.strokeStyle = 'rgba(201, 168, 76, ' + alpha + ')';
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                    connections++;
                }
            }
        }
    }

    let shootingStars = [];

    class ShootingStar {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * W;
            this.y = Math.random() * H * 0.4;
            this.length = Math.random() * 120 + 60;
            this.speed = Math.random() * 15 + 8;
            this.angle = Math.random() * Math.PI / 3 + Math.PI / 4;
            this.vx = Math.cos(this.angle) * this.speed;
            this.vy = Math.sin(this.angle) * this.speed;
            this.life = 1;
            this.decay = Math.random() * 0.015 + 0.008;
            this.width = Math.random() * 2 + 1.5;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
        }

        draw() {
            if (this.life <= 0) return;

            const tailX = this.x - Math.cos(this.angle) * this.length;
            const tailY = this.y - Math.sin(this.angle) * this.length;

            const gradient = ctx.createLinearGradient(this.x, this.y, tailX, tailY);
            gradient.addColorStop(0, 'rgba(255, 255, 255, ' + this.life + ')');
            gradient.addColorStop(0.3, 'rgba(255, 236, 139, ' + (this.life * 0.9) + ')');
            gradient.addColorStop(0.7, 'rgba(201, 168, 76, ' + (this.life * 0.6) + ')');
            gradient.addColorStop(1, 'transparent');

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(tailX, tailY);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = this.width;
            ctx.lineCap = 'round';
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, ' + this.life + ')';
            ctx.fill();
        }
    }

    function animate() {
        ctx.clearRect(0, 0, W, H);

        galaxies.forEach(galaxy => {
            galaxy.update();
            galaxy.draw();
        });

        drawConstellations();

        stars.forEach(star => {
            star.update();
            star.draw();
        });

        if (Math.random() < 0.015 && shootingStars.length < 4) {
            shootingStars.push(new ShootingStar());
        }

        shootingStars = shootingStars.filter(ss => {
            ss.update();
            ss.draw();
            return ss.life > 0 && ss.x < W + 200 && ss.y < H + 200;
        });

        requestAnimationFrame(animate);
    }

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';

    initStars();
    initGalaxies();
    animate();
})();