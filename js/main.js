// 论文数据
const publications = [
    {
        id: 1,
        title: "量子纠缠态在蛋白质折叠过程中的理论预测与实验验证",
        authors: "张教授*, 李博士, 王教授 (*通讯作者)",
        journal: "Nature Physics",
        year: 2023,
        doi: "10.1038/s41567-023-02045-1",
        impact: 20.034,
        citations: 28
    },
    // ... 其他论文数据
];

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 渲染论文列表
    renderPublications();
    
    // 添加事件监听器
    setupEventListeners();
});

// 渲染论文列表
function renderPublications() {
    const publicationsList = document.querySelector('#publications-list');
    if (!publicationsList) return;

    const html = publications.map(pub => `
        <div class="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300">
            <h4 class="font-heading text-lg font-semibold text-lab-blue">
                ${pub.title}
            </h4>
            <p class="text-lab-gray text-sm">${pub.authors}</p>
            <div class="text-sm">
                <span class="font-medium text-lab-teal">${pub.journal}</span>
                <span class="text-lab-gray">•</span>
                <span>${pub.year}</span>
            </div>
        </div>
    `).join('');

    publicationsList.innerHTML = html;
}

// 论文展示相关功能
// 论文数据 - 中英文版本
const papers = {
    'all': [
        {
            titleEn: 'UltraMotion: High-precision Ultrasonic Arm Tracking for Real-world Exercises',
            titleCn: 'UltraMotion：用于实际运动的高精度超声波手臂跟踪',
            authorsEn: 'Xiaoguang Niu, Kaiyi Zou, Da Shen, Steve Drew, Shaowu Wu, Guangyi Guo, Ruizhi Chen',
            authorsCn: '牛晓光, 邹凯毅, 沈达, Steve Drew, 吴少武, 郭光忆, 陈锐志',
            journal: 'IEEE Transactions on Mobile Computing',
            year: '2023',
            doi: 'https://doi.org/10.1109/TMC.2023.3241077',
            type: 'sci'
        },
        {
            titleEn: 'USDNL: Uncertainty-based Single Dropout in Noisy Label Learning',
            titleCn: 'USDNL：基于不确定性的噪声标签学习单点退出方法',
            authorsEn: 'Xiaoguang Niu, Jianbin Jiao, Xiaolong Wang, Wei-Shi Zheng',
            authorsCn: '牛晓光, 焦建斌, 王晓龙, 郑伟诗',
            journal: 'IEEE Transactions on Pattern Analysis and Machine Intelligence',
            year: '2023',
            doi: 'https://doi.org/10.1109/TPAMI.2022.3231909',
            type: 'sci'
        },
        {
            titleEn: 'SenseLoc: Sensing Everyday Places and POIs using Ultrasonic Soundwaves',
            titleCn: 'SenseLoc：使用超声波感知日常场所和兴趣点',
            authorsEn: 'Xiaoguang Niu, Qiang Zhai, Yue Zhang, Weiping Shu, Victor C. M. Leung',
            authorsCn: '牛晓光, 翟强, 张悦, 舒卫平, Victor C. M. Leung',
            journal: 'ACM MobiCom',
            year: '2022',
            doi: 'https://doi.org/10.1145/3495243.3517017',
            type: 'conference'
        }
    ]
};

// 语言状态
let currentLang = 'en';  // 默认为英文

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // 设置语言切换按钮事件
    const langSwitch = document.getElementById('lang-switch');
    const mobileLangSwitch = document.getElementById('mobile-lang-switch');
    
    if (langSwitch) {
        langSwitch.addEventListener('click', switchLanguage);
    }
    if (mobileLangSwitch) {
        mobileLangSwitch.addEventListener('click', switchLanguage);
    }

    // 初始化语言显示
    updateLanguageDisplay();

    // 根据类型过滤论文
    papers.sci = papers.all.filter(paper => paper.type === 'sci');
    papers.conference = papers.all.filter(paper => paper.type === 'conference');

    // 初始显示所有论文
    updatePapers('all');
    
    // 设置过滤器事件
    setupFilterButtons();
    
    // 设置查看更多按钮
    setupViewMoreButton();
    
    // 平滑滚动设置
    setupSmoothScroll();
    
    // 设置成员卡片点击事件
    setupMemberCards();
    
    // 设置成员头像点击事件
    setupMembersPreview();
});

// 切换语言函数
function switchLanguage() {
    currentLang = currentLang === 'en' ? 'cn' : 'en';
    updateLanguageDisplay();
}

// 更新语言显示
function updateLanguageDisplay() {
    // 切换所有带有 data-lang 属性的元素
    document.querySelectorAll('[data-lang]').forEach(el => {
        if (el.getAttribute('data-lang') === currentLang) {
            el.classList.remove('hidden');
        } else {
            el.classList.add('hidden');
        }
    });

    // 更新论文列表
    const currentType = document.querySelector('#publications button.bg-gray-900')?.getAttribute('data-type') || 'all';
    updatePapers(currentType);
}

// 生成论文HTML
function generatePaperHTML(paper) {
    const title = currentLang === 'en' ? paper.titleEn : paper.titleCn;
    const authors = currentLang === 'en' ? paper.authorsEn : paper.authorsCn;
    
    return `
        <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-lg font-medium text-gray-900 mb-2">${title}</h3>
            <p class="text-gray-600 mb-4">${authors}</p>
            <div class="flex items-center gap-4 text-sm text-gray-500">
                <span>${paper.journal}</span>
                <span>${paper.year}</span>
                <a href="${paper.doi}" class="text-blue-600 hover:text-blue-800 flex items-center gap-1" target="_blank">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    DOI
                </a>
            </div>
        </div>
    `;
}

// 更新论文列表显示
function updatePapers(type) {
    const paperList = document.querySelector('#publications .space-y-6');
    if (paperList) {
        paperList.innerHTML = papers[type].map(generatePaperHTML).join('');
    }
}

// 设置过滤器按钮
function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('#publications .flex.flex-wrap.gap-4 button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            
            // 更新按钮样式
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-gray-900', 'text-white');
                btn.classList.add('border', 'border-gray-300', 'hover:bg-gray-50');
            });
            this.classList.remove('border', 'border-gray-300', 'hover:bg-gray-50');
            this.classList.add('bg-gray-900', 'text-white');
            
            // 更新论文列表
            updatePapers(type);
        });
    });
}

// 设置查看更多按钮
function setupViewMoreButton() {
    const viewMoreButton = document.querySelector('#publications .text-center button');
    let showingAll = false;
    
    if (viewMoreButton) {
        viewMoreButton.addEventListener('click', function() {
            const paperList = document.querySelector('#publications .space-y-6');
            if (!showingAll) {
                // 显示更多论文
                const allPapers = papers.all.map(generatePaperHTML).join('');
                paperList.innerHTML = allPapers;
                
                // 更新按钮文本
                const btnTextCn = this.querySelector('[data-lang="cn"]');
                const btnTextEn = this.querySelector('[data-lang="en"]');
                
                if (btnTextCn) btnTextCn.textContent = '收起';
                if (btnTextEn) btnTextEn.textContent = 'Collapse';
                
                showingAll = true;
            } else {
                // 恢复原始显示
                const currentType = document.querySelector('#publications button.bg-gray-900')?.getAttribute('data-type') || 'all';
                updatePapers(currentType);
                
                // 恢复按钮文本
                const btnTextCn = this.querySelector('[data-lang="cn"]');
                const btnTextEn = this.querySelector('[data-lang="en"]');
                
                if (btnTextCn) btnTextCn.textContent = '查看更多论文';
                if (btnTextEn) btnTextEn.textContent = 'View More Papers';
                
                showingAll = false;
            }
        });
    }
}

// 设置平滑滚动
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 64, // 减去导航栏高度
                    behavior: 'smooth'
                });
                
                // 如果是移动端，点击后关闭菜单
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
}

// 平滑滚动到联系方式
document.querySelectorAll('a[href="#contact"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('#contact').scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 更新生成论文HTML的函数
function generatePaperHTML(paper) {
    const title = currentLang === 'en' ? paper.titleEn : paper.titleCn;
    const authors = currentLang === 'en' ? paper.authorsEn : paper.authorsCn;
    
    return `
        <div class="bg-gray-50 p-6 rounded-lg">
            <h3 class="text-lg font-medium text-gray-900 mb-2">${title}</h3>
            <p class="text-gray-600 mb-4">${authors}</p>
            <div class="flex items-center gap-4 text-sm text-gray-500">
                <span>${paper.journal}</span>
                <span>${paper.year}</span>
                <a href="${paper.doi}" class="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    DOI
                </a>
            </div>
        </div>
    `;
}

// 设置成员卡片点击展开/收起的功能
function setupMemberCards() {
    const memberCards = document.querySelectorAll('.member-card');
    
    memberCards.forEach(card => {
        card.addEventListener('click', function() {
            const info = this.querySelector('.member-info');
            
            // 切换显示/隐藏
            if (info.classList.contains('hidden')) {
                // 先隐藏所有其他展开的卡片
                document.querySelectorAll('.member-info:not(.hidden)').forEach(openInfo => {
                    openInfo.classList.add('hidden');
                    openInfo.closest('.member-card').classList.remove('expanded');
                });
                
                // 展开当前卡片
                info.classList.remove('hidden');
                this.classList.add('expanded');
            } else {
                // 收起当前卡片
                info.classList.add('hidden');
                this.classList.remove('expanded');
            }
        });
    });
}

// 设置成员头像预览点击事件
function setupMembersPreview() {
    const avatarPreviews = document.querySelectorAll('.member-avatar-preview');
    const membersDetail = document.querySelector('.members-detail');
    
    avatarPreviews.forEach(avatar => {
        avatar.addEventListener('click', function() {
            // 切换详情区域显示状态
            if (membersDetail.classList.contains('active')) {
                // 如果当前头像已经是激活状态，则关闭详情
                if (this.classList.contains('active')) {
                    membersDetail.classList.remove('active');
                    this.classList.remove('active');
                } else {
                    // 否则切换激活的头像
                    document.querySelector('.member-avatar-preview.active')?.classList.remove('active');
                    this.classList.add('active');
                    
                    // 滚动到对应的成员类别
                    const category = this.getAttribute('data-category');
                    const categoryElement = document.getElementById(category);
                    if (categoryElement) {
                        setTimeout(() => {
                            categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 100);
                    }
                }
            } else {
                // 打开详情区域
                membersDetail.classList.add('active');
                this.classList.add('active');
                
                // 滚动到对应的成员类别
                const category = this.getAttribute('data-category');
                const categoryElement = document.getElementById(category);
                if (categoryElement) {
                    setTimeout(() => {
                        categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 300);
                }
            }
        });
    });
}