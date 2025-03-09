// 伊江島マラソンサイト - スクロールアニメーション修正版

document.addEventListener('DOMContentLoaded', function() {
    // 各要素にアニメーションクラスを追加
    const sections = document.querySelectorAll('.members-section, .schedule-section, .location-section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // メンバーカードの初期表示を保証
    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach((card, index) => {
        // デフォルトで表示されるよう設定
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        // アニメーションを追加（オプション）
        card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s`;
    });
    
    // 観光スポットカードにアニメーションを追加
    const locationCards = document.querySelectorAll('.location-card');
    locationCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
    });
    
    // スクロール時のアニメーション
    function checkScroll() {
        // セクションのフェードイン
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
        
        // 観光スポットカードのアニメーション
        locationCards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (cardTop < windowHeight - 50) {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                }, index * 150);
            }
        });
        
        // タイムラインアイテムのアニメーション
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < window.innerHeight - 50) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 150);
            }
        });
    }
    
    // 初回チェック
    setTimeout(checkScroll, 300);
    
    // スクロール時にチェック
    window.addEventListener('scroll', checkScroll);
    
    // タブの切り替え
    const dayTabs = document.querySelectorAll('.day-tab');
    const scheduleContents = document.querySelectorAll('.schedule-content');
    
    dayTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const day = tab.getAttribute('data-day');
            
            // タブのアクティブ状態を切り替え
            dayTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // コンテンツの表示を切り替え
            scheduleContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === day) {
                    content.classList.add('active');
                }
            });
            
            // タイムラインアイテムのアニメーションをリセット
            const timelineItems = document.querySelectorAll(`#${day} .timeline-item`);
            timelineItems.forEach((item, index) => {
                item.classList.remove('visible');
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 150);
            });
        });
    });
    
    // ページ内リンクのスムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 画像読み込みエラー時の処理
    document.querySelectorAll('img.member-image').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x400?text=写真準備中';
            this.alt = '写真準備中';
        });
    });
});
