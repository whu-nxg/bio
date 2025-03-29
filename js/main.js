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
// 删除重复的 publications 变量和 renderPublications 函数
// 确保只保留一个 papers 变量

const papers = {
    'all': [
        {
            titleEn: 'Dynamic selection for reconstructing instance-dependent noisy labels',
            titleCn: '动态选择用于重构实例依赖的噪声标签',
            authorsEn: 'J Yang, X Niu, Y Xu, Z Zhang, G Guo, S Drew, R Chen',
            authorsCn: '杨杰, 牛晓光, 徐阳, 张志, 郭光忆, Steve Drew, 陈锐志',
            journal: 'Pattern Recognition',
            year: '2024',
            doi: '',
            type: 'sci'
        },
        {
            titleEn: 'Label-Expanded Feature Debiasing for Single Domain Generalization',
            titleCn: '标签扩展特征去偏用于单域泛化',
            authorsEn: 'J Yang, L Jing, Y Xu, S Wu, S Drew, X Niu',
            authorsCn: '杨杰, 景丽, 徐阳, 吴少武, Steve Drew, 牛晓光',
            journal: 'International Conference on Pattern Recognition',
            year: '2024',
            doi: '',
            type: 'conference'
        },
        {
            titleEn: 'Smartphone Indoor Fusion Localization with Trust Region-Based Magnetic Matching',
            titleCn: '基于信任区域磁匹配的智能手机室内融合定位',
            authorsEn: 'Y Zhu, Y Jia, K Zou, X Niu',
            authorsCn: '朱阳, 贾阳, 邹凯毅, 牛晓光',
            journal: 'International Conference on Wireless Artificial Intelligent Computing',
            year: '2024',
            doi: '',
            type: 'conference'
        },
        {
            titleEn: 'Federated Learning with Client Availability Budgets',
            titleCn: '具有客户端可用性预算的联邦学习',
            authorsEn: 'Y Bao, S Drew, X Wang, J Zhou, X Niu',
            authorsCn: '鲍阳, Steve Drew, 王晓龙, 周杰, 牛晓光',
            journal: 'GLOBECOM 2023-2023 IEEE Global Communications Conference',
            year: '2023',
            doi: '',
            type: 'conference'
        },
        {
            titleEn: 'Application Status, Development and Future Trend of High-Precision Indoor Navigation and Tracking',
            titleCn: '高精度室内导航与跟踪的应用现状、发展及未来趋势',
            authorsEn: 'R CHEN, G GUO, L CHEN, X NIU',
            authorsCn: '陈锐志, 郭光忆, 陈亮, 牛晓光',
            journal: 'Geomatics and Information Science of Wuhan University',
            year: '2023',
            doi: '',
            type: 'sci'
        },
        {
            titleEn: 'USDNL: Uncertainty-based single dropout in noisy label learning',
            titleCn: 'USDNL：基于不确定性的噪声标签学习单点退出方法',
            authorsEn: 'Y Xu, X Niu, J Yang, S Drew, J Zhou, R Chen',
            authorsCn: '徐阳, 牛晓光, 杨杰, Steve Drew, 周杰, 陈锐志',
            journal: 'Proceedings of the AAAI Conference on Artificial Intelligence',
            year: '2023',
            doi: '',
            type: 'conference'
        },
        {
            titleEn: 'ChirpTracker: A precise-location-aware system for acoustic tag using single smartphone',
            titleCn: 'ChirpTracker：使用单个智能手机的精确位置感知声标签系统',
            authorsEn: 'X Lin, R Chen, L Huang, Z Liu, X Niu, G Guo, Z Li, L Qian',
            authorsCn: '林晓, 陈锐志, 黄亮, 刘志, 牛晓光, 郭光忆, 李志, 钱亮',
            journal: 'IEEE Internet of Things Journal',
            year: '2023',
            doi: '',
            type: 'sci'
        },
        {
            titleEn: 'Factor graph framework for smartphone indoor localization: Integrating data-driven PDR and Wi-Fi RTT/RSS ranging',
            titleCn: '智能手机室内定位的因子图框架：集成数据驱动的PDR和Wi-Fi RTT/RSS测距',
            authorsEn: 'G Guo, R Chen, X Niu, K Yan, S Xu, L Chen',
            authorsCn: '郭光忆, 陈锐志, 牛晓光, 严凯, 徐松, 陈亮',
            journal: 'IEEE Sensors Journal',
            year: '2023',
            doi: '',
            type: 'sci'
        },
        {
            titleEn: 'Large-scale indoor localization solution for pervasive smartphones using corrected acoustic signals and data-driven PDR',
            titleCn: '使用校正的声学信号和数据驱动的PDR的广泛智能手机大规模室内定位解决方案',
            authorsEn: 'G Guo, R Chen, K Yan, Z Li, L Qian, S Xu, X Niu, L Chen',
            authorsCn: '郭光忆, 陈锐志, 严凯, 李志, 钱亮, 徐松, 牛晓光, 陈亮',
            journal: 'IEEE Internet of Things Journal',
            year: '2023',
            doi: '',
            type: 'sci'
        },
        {
            titleEn: 'Ultramotion: High-precision ultrasonic arm tracking for real-world exercises',
            titleCn: 'UltraMotion：用于实际运动的高精度超声波手臂跟踪',
            authorsEn: 'X Niu, K Zou, D Shen, S Drew, S Wu, G Guo, R Chen',
            authorsCn: '牛晓光, 邹凯毅, 沈达, Steve Drew, 吴少武, 郭光忆, 陈锐志',
            journal: 'IEEE Transactions on Mobile Computing',
            year: '2023',
            doi: 'https://doi.org/10.1109/TMC.2023.3241077',
            type: 'sci'
        },
        {
            titleEn: 'OCP: an OLAP-based bus crowdedness smart-perceiving mechanism for urban transportation',
            titleCn: 'OCP：一种基于OLAP的城市交通公交拥挤智能感知机制',
            authorsEn: 'S Gong, D Liu, MZA Bhuiyan, X Niu',
            authorsCn: '龚松, 刘达, MZA Bhuiyan, 牛晓光',
            journal: 'Connection Science',
            year: '2022',
            doi: '',
            type: 'sci'
        },
        {
            titleEn: 'MAGINS: Neural network inertial navigation system corrected by magnetic information',
            titleCn: 'MAGINS：由磁信息校正的神经网络惯性导航系统',
            authorsEn: 'C Qiu, Y Xu, Y Zhu, L Xie, D Shen, J Huang, X Niu',
            authorsCn: '邱成, 徐阳, 朱阳, 谢亮, 沈达, 黄杰, 牛晓光',
            journal: '2021 IEEE International Performance, Computing, and Communications',
            year: '2021',
            doi: '',
            type: 'conference'
        },
        {
            titleEn: 'A Comprehensive Survey on Local Differential Privacy (vol 2020, 8829523, 2020)',
            titleCn: '关于局部差分隐私的综合调查（2020年，第8829523卷，2020年）',
            authorsEn: 'X Xiong, S Liu, D Li, Z Cai, X Niu',
            authorsCn: '熊晓, 刘松, 李达, 蔡志, 牛晓光',
            journal: 'SECURITY AND COMMUNICATION NETWORKS',
            year: '2021',
            doi: '',
            type: 'sci'
        },
        {
            titleEn: 'A comprehensive survey on local differential privacy',
            titleCn: '关于局部差分隐私的综合调查',
            authorsEn: 'X Xiong, S Liu, D Li, Z Cai, X Niu',
            authorsCn: '熊晓, 刘松, 李达, 蔡志, 牛晓光',
            journal: 'Security and Communication Networks',
            year: '2020',
            doi: '',
            type: 'sci'
        }
    ]
};


// 语言状态
let currentLang = 'en';  // 默认为英文

// 控制论文显示数量
let showAllPapers = false;
const initialPaperCount = 3;

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
    
    // 添加"查看更多"按钮的点击事件
    const viewMoreButton = document.getElementById('view-more-papers');
    if (viewMoreButton) {
        viewMoreButton.addEventListener('click', function() {
            showAllPapers = !showAllPapers; // 切换显示状态
            // 获取当前选中的论文类型
            const activeFilterButton = document.querySelector('#publications button.bg-gray-900');
            const type = activeFilterButton ? activeFilterButton.getAttribute('data-type') : 'all';
            updatePapers(type);
            updateViewMoreButtonText(); // 更新按钮文本
        });
    }
    
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

// 更新"查看更多"按钮的状态
function updateViewMoreButton(totalCount) {
    const viewMoreButton = document.getElementById('view-more-papers');
    if (viewMoreButton) {
        // 始终显示按钮，并根据 showAllPapers 状态更新文本
        viewMoreButton.style.display = 'inline-flex';
        updateViewMoreButtonText();
    }
}

// 更新"查看更多"按钮的文本
function updateViewMoreButtonText() {
    const viewMoreButton = document.getElementById('view-more-papers');
    if (viewMoreButton) {
        if (showAllPapers) {
            viewMoreButton.querySelector('span[data-lang="cn"]').textContent = '收起';
            viewMoreButton.querySelector('span[data-lang="en"]').textContent = 'Collapse';
        } else {
            viewMoreButton.querySelector('span[data-lang="cn"]').textContent = '查看更多论文';
            viewMoreButton.querySelector('span[data-lang="en"]').textContent = 'View More Papers';
        }
    }
}

// 更新论文列表显示
function updatePapers(type) {
    const paperList = document.querySelector('#publications-list');
    if (paperList) {
        // 根据类型筛选论文
        const filteredPapers = papers[type] || papers.all;
        
        // 根据 showAllPapers 决定显示多少篇论文
        const papersToShow = showAllPapers ? filteredPapers : filteredPapers.slice(0, initialPaperCount);
        
        // 生成HTML
        paperList.innerHTML = papersToShow.map(generatePaperHTML).join('');
        
        // 更新按钮状态
        updateViewMoreButton(filteredPapers.length);
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
            
            // 重置显示状态
            showAllPapers = false;
            
            // 更新论文列表
            updatePapers(type);
        });
    });
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