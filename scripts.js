// 伊江島マラソンWebサイト JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // セクションにフェードインアニメーションを追加
    const sections = document.querySelectorAll('.members-section, .schedule-section, .location-section');
    sections.forEach(section => {
        section.classList.add('fade-in');
    });
    
    // 画像読み込みエラー時のフォールバック処理
    document.querySelectorAll('img.member-image').forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'https://via.placeholder.com/400x400?text=写真準備中';
            this.alt = '写真準備中';
        });
    });
    
    // スクロール時のアニメーション
    function checkScroll() {
        // 各セクションのフェードイン
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementPosition < windowHeight - 100) {
                element.classList.add('visible');
            }
        });
        
        // タイムラインアイテムのアニメーション
        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            const itemPosition = item.getBoundingClientRect().top;
            if (itemPosition < window.innerHeight - 50) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 100); // 少し時間差をつける
            }
        });
    }
    
    // 初回ロード時にもチェック
    window.addEventListener('load', checkScroll);
    
    // スクロール時にアニメーション状態をチェック
    window.addEventListener('scroll', checkScroll);
    
    // 日程タブの切り替え機能
    const dayTabs = document.querySelectorAll('.day-tab');
    const scheduleContents = document.querySelectorAll('.schedule-content');
    
    dayTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // すべてのタブからアクティブクラスを削除
            dayTabs.forEach(t => t.classList.remove('active'));
            // クリックされたタブにアクティブクラスを追加
            this.classList.add('active');
            
            // タブに関連するスケジュールコンテンツを表示
            const day = this.getAttribute('data-day');
            scheduleContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === day) {
                    content.classList.add('active');
                    
                    // 新しいタブのタイムラインアイテムのアニメーションをリセット
                    const timelineItems = content.querySelectorAll('.timeline-item');
                    timelineItems.forEach((item, index) => {
                        item.classList.remove('visible');
                        setTimeout(() => {
                            item.classList.add('visible');
                        }, index * 100);
                    });
                }
            });
        });
    });
    
    // スムーススクロール機能
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // ヘッダーの高さ分を引く
                    behavior: 'smooth'
                });
            }
        });
    });
});
