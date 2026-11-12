import { ModuleData, SafetyNetTheorem } from './types';

export const CURRICULUM_MODULES: ModuleData[] = [
  // ==========================================
  // PHASE 1: نمره‌های تضمینی جبری (دستگاه‌ها)
  // ==========================================
  {
    id: 'module-1',
    number: 1,
    phaseId: 1,
    phaseName: 'فاز ۱: دستگاه‌های خطی و جبر ماتریسی',
    title: 'مقادیر ویژه متمایز و مقادیر ویژه مختلط',
    subtitle: 'فرمول اویلر، تفکیک جواب به بخش‌های حقیقی و موهومی مستقل خطی',
    examScoreEstimate: '۴ نمره قطعی',
    lecturePages: 'صفحات ۱۵ تا ۲۲ جزوه',
    examRef: 'مسائل پایه و مثال‌های حل‌شده ۲.۴ و ۲.۷ جزوه',
    prerequisiteBridge: [
      'محاسبه دترمینان ۲ در ۲: \\det \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc',
      'یافتن ریشه‌های معادله درجه ۲ با دلتا: r = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}',
      'فرمول اویلر برای اعداد مختلط: e^{i\\theta} = \\cos \\theta + i \\sin \\theta',
    ],
    intuition: {
      summary:
        'وقتی یک دستگاه خطی $\dot{X} = AX$ داریم، حدس می‌زنیم جواب‌ها به فرم نمایی $X(t) = e^{rt}v$ باشند. مشتق گرفتن نشان می‌دهد r باید مقدار ویژه A و v بردار ویژه آن باشد. اگر r مختلط شود (یعنی \\alpha \\pm i\\beta)، بردار ویژه هم مختلط می‌شود (v^{(1)} \\pm i v^{(2)}). چون در دنیای واقعی و ورقه امتحان استاد جواب‌های حقیقی می‌خواهد، با فرمول اویلر جواب را باز می‌کنیم و بخش حقیقی و موهومی را جدا می‌کنیم؛ معجزه اینجاست که هر دو بخش خودبه‌خود دو جواب مستقل خطی حقیقی هستند!',
      whyItMatters:
        'استاد شهروزی معمولاً یک ماتریس با مقادیر ویژه مختلط در امتحان می‌دهد تا ببیند آیا دانشجو بلد است جواب نهایی را بدون i بنویسد یا نه.',
      microCheck: {
        question:
          'اگر مقدار ویژه $r = 1 + 2i$ باشد و بردار ویژه مختلط متناظر آن v = \\begin{pmatrix} 1 \\\\ i \\end{pmatrix} باشد، بخش موهومی جواب X^{(2)}(t) = \\text{Im}(e^{rt}v) کدام است؟',
        hint: 'از رابطه e^{(1+2i)t} = e^t($\cos 2t$ + i\\sin 2t) استفاده کنید و در بردار ضرب کنید.',
        answerLatex: 'X^{(2)}(t) = e^t \\begin{pmatrix} \\sin 2t \\\\ $\cos 2t$ \\end{pmatrix}',
        answerExplanation:
          'با ضرب e^t($\cos 2t$ + i\\sin 2t) در سطر دوم یعنی i، جمله i$\cos 2t$ - \\sin 2t به دست می‌آید که ضریب i در آن $\cos 2t$ است.',
      },
    },
    formalTools: [
      {
        title: 'قضیه مقادیر ویژه مختلط (قضیه ۲.۶ جزوه)',
        theoremName: 'تفکیک جواب حقیقی از مختلط',
        latex:
          'Z(t) = X(t) + iY(t) \\implies X(t) = \\text{Re}(Z(t)), \\; Y(t) = \\text{Im}(Z(t)) \\text{ are real solutions}',
        conditions: [
          'A یک ماتریس حقیقی n \\times n با ضرایب ثابت است.',
          'اگر r = \\alpha + i\\beta و v = v^{(1)} + i v^{(2)} باشد، دو جواب مستقل خطی عبارتند از:',
          'X^{(1)}(t) = e^{\\alpha t} (\\cos \\beta t \\, v^{(1)} - \\sin \\beta t \\, v^{(2)})',
          'X^{(2)}(t) = e^{\\alpha t} (\\cos \\beta t \\, v^{(2)} + \\sin \\beta t \\, v^{(1)})',
        ],
      },
    ],
    examWalkthrough: {
      problemStatement:
        'دستگاه معادلات دیفرانسیل زیر را با روش مقادیر ویژه و بردارهای ویژه به طور کامل حل کنید و جواب عمومی حقیقی را بیابید:',
      problemLatex:
        '\\dot{X} = \\begin{pmatrix} 1 & 2 \\\\ -2 & 1 \\end{pmatrix} X',
      steps: [
        {
          stepNumber: 1,
          stepTitle: 'تشکیل معادله مشخصه و یافتن مقادیر ویژه',
          explanation:
            'دترمینان ماتریس A - rI را مساوی صفر قرار می‌دهیم:',
          latex:
            '\\det(A - rI) = \\det \\begin{pmatrix} 1-r & 2 \\\\ -2 & 1-r \\end{pmatrix} = (1-r)^2 - (-4) = r^2 - 2r + 5 = 0',
          scoringTip: 'همیشه دلتا یا فرم مربع کامل را واضح بنویسید: (r-1)^2 = -4 \\implies r = 1 $\pm 2i$.',
        },
        {
          stepNumber: 2,
          stepTitle: 'محاسبه بردار ویژه متناظر با $r = 1 + 2i$',
          explanation:
            'دستگاه جبری $(A - (1+2i)I)v = 0$ را تشکیل می‌دهیم:',
          latex:
            '\\begin{pmatrix} -2i & 2 \\\\ -2 & -2i \\end{pmatrix} \\begin{pmatrix} v_1 \\\\ v_2 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix} \\implies -2i v_1 + 2 v_2 = 0 \\implies v_2 = i v_1',
          scoringTip:
            'با قرار دادن $v_1 = 1$، بردار ویژه v = \\begin{pmatrix} 1 \\\\ i \\end{pmatrix} = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} + i \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix} به دست می‌آید.',
        },
        {
          stepNumber: 3,
          stepTitle: 'تشکیل جواب مختلط و بسط با فرمول اویلر',
          explanation:
            'جواب مختلط را بر اساس e^{rt}v می‌نویسیم و به بخش‌های حقیقی و موهومی تفکیک می‌کنیم:',
          latex:
            'X_{comp}(t) = e^{(1+2i)t} \\begin{pmatrix} 1 \\\\ i \\end{pmatrix} = e^t ($\cos 2t$ + i \\sin 2t) \\begin{pmatrix} 1 \\\\ i \\end{pmatrix} = \\begin{pmatrix} e^t $\cos 2t$ + i e^t \\sin 2t \\\\ -e^t \\sin 2t + i e^t $\cos 2t$ \\end{pmatrix}',
        },
        {
          stepNumber: 4,
          stepTitle: 'جداسازی جواب‌های حقیقی و نوشتن جواب عمومی',
          explanation:
            'بخش حقیقی X^{(1)} و بخش موهومی X^{(2)} را نوشته و ترکیب خطی آن‌ها را تشکیل می‌دهیم:',
          latex:
            'X(t) = c_1 e^t \\begin{pmatrix} $\cos 2t$ \\\\ -\\sin 2t \\end{pmatrix} + c_2 e^t \\begin{pmatrix} \\sin 2t \\\\ $\cos 2t$ \\end{pmatrix}',
          scoringTip:
            'حتماً ذکر کنید که c_1 و c_2 ثابت‌های دلخواه حقیقی هستند و جواب نهایی هیچ نماد موهومی i ندارد.',
        },
      ],
    },
    gotchas: [
      {
        title: 'باقی ماندن واحد موهومی i در جواب نهایی',
        warning:
          'اگر در جواب عمومی $c_1 e^{(1+2i)t}v$ بگذارید، دکتر شهروزی نمره عمده سوال را کسر می‌کند! دستگاه حقیقی نیازمند جواب حقیقی با توابع سینوس و کسینوس است.',
        deductionReason: 'عدم ارائه جواب بر پایه توابع حقیقی مستقل خطی.',
      },
      {
        title: 'اشتباه علامت در سطر دوم بردار ویژه',
        warning:
          'دقت کنید که i \\times i = -1 است، بنابراین i($\cos 2t$ + i\\sin 2t) تبدیل به -\\sin 2t + i$\cos 2t$ می‌شود، نه مثبت!',
        deductionReason: 'خطای محاسباتی در ضرب اعداد مختلط.',
      },
    ],
    twinChallenge: {
      problemTitle: 'چالش شبیه‌ساز: دستگاه با مقادیر ویژه مختلط خالص',
      problemStatement:
        'دستگاه خطی زیر را حل کرده و جواب عمومی حقیقی را به طور کامل بیابید:',
      problemLatex:
        '\\dot{X} = \\begin{pmatrix} 0 & 3 \\\\ -3 & 0 \\end{pmatrix} X, \\quad X(0) = \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix}',
      solutionSteps: [
        {
          stepTitle: 'معادله مشخصه',
          description: '\\det(A-rI) = r^2 + 9 = 0 \\implies r = $\pm 3i$ (یعنی \\alpha = 0, \\beta = 3).',
          latex: 'r = $\pm 3i$',
        },
        {
          stepTitle: 'بردار ویژه متناظر r = 3i',
          description:
            '\\begin{pmatrix} -3i & 3 \\\\ -3 & -3i \\end{pmatrix} \\begin{pmatrix} v_1 \\\\ v_2 \\end{pmatrix} = 0 \\implies v_2 = i v_1 \\implies v = \\begin{pmatrix} 1 \\\\ i \\end{pmatrix}',
        },
        {
          stepTitle: 'تفکیک جواب حقیقی',
          description:
            'X^{(1)}(t) = \\begin{pmatrix} \\cos 3t \\\\ -\\sin 3t \\end{pmatrix}, \\quad X^{(2)}(t) = \\begin{pmatrix} \\sin 3t \\\\ \\cos 3t \\end{pmatrix}',
        },
        {
          stepTitle: 'اعمال شرط اولیه',
          description:
            'X(0) = c_1 \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} + c_2 \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 1 \\end{pmatrix} \\implies c_1 = 2, c_2 = 1',
        },
      ],
      finalAnswer:
        'X(t) = \\begin{pmatrix} 2\\cos 3t + \\sin 3t \\\\ -2\\sin 3t + \\cos 3t \\end{pmatrix}',
    },
  },

  // ==========================================
  // MODULE 2: مقادیر ویژه تکراری و بردار تعمیم‌یافته
  // ==========================================
  {
    id: 'module-2',
    number: 2,
    phaseId: 1,
    phaseName: 'فاز ۱: دستگاه‌های خطی و جبر ماتریسی',
    title: 'مقادیر ویژه تکراری و بردار ویژه تعمیم‌یافته',
    subtitle: 'حل ماتریس‌های با نقص بردار ویژه (Defective Matrices) با شرط (A - rI)^2 v = 0',
    examScoreEstimate: '۵ نمره قطعی',
    lecturePages: 'صفحات ۲۲ تا ۲۶ جزوه',
    examRef: 'سوال ۴ صفحه ۴ و ۵ نمونه‌سوالات میان‌ترم',
    prerequisiteBridge: [
      'ضرب ماتریس در ماتریس ۳ در ۳ (سطر در ستون).',
      'مفهوم مرتبه تکرار جبری (تعداد ریشه‌های مشخصه) در برابر مرتبه هندسی (تعداد بردارهای ویژه مستقل).',
      'اگر ماتریس به اندازه مرتبه تکرارش بردار ویژه مستقل ندهد، به آن ماتریس ناقص (Defective) می‌گویند.',
    ],
    intuition: {
      summary:
        'وقتی در معادله مشخصه ریشه تکراری r داریم، در حالت عادی دنبال دو یا سه بردار ویژه مستقل از معادله (A - rI)v = 0 می‌گردیم. اما گاهی ماتریس لجبازی می‌کند و فقط یک بردار ویژه مستقل می‌دهد! اینجا سیستم جواب کم می‌آورد. راه حل نجات: از سری نمایی تیلور استفاده می‌کنیم! اگر به جای (A - rI)v = 0، توان دوم را صفر کنیم یعنی (A - rI)^2 v^{(3)} = 0، یک بردار جدید به نام «بردار ویژه تعمیم‌یافته» پیدا می‌شود که وقتی در فرمول e^{rt}[I + (A - rI)t]v ضرب می‌شود، جواب سوم گم‌شده را برایمان می‌سازد.',
      whyItMatters:
        'سوال ۴ میان‌ترم دقیقاً یک ماتریس ۳ در ۳ با ریشه تکراری ۲ و کمبود بردار ویژه بود. استاد عاشق این سوال است چون تسلط دانشجو روی جبر خطی پیشرفته را می‌سنجد.',
      microCheck: {
        question:
          'چرا در فرمول بسط $e^{At}$v = e^{rt}[I + (A-rI)t + \\frac{(A-rI)^2 t^2}{2!} + \\dots]v جملات از توان ۲ به بعد حذف می‌شوند؟',
        hint: 'به شرط انتخاب بردار ویژه تعمیم‌یافته دقت کنید.',
        answerLatex: '(A - rI)^2 v = 0 \\implies (A - rI)^k v = 0 \\quad (\\forall k \\ge 2)',
        answerExplanation:
          'چون بردار تعمیم‌یافته v طوری انتخاب شده که توان دوم ماتریس آن را صفر می‌کند، تمام توان‌های بالاتر ۳ و ۴ نیز صفر مطلق می‌شوند و سری قطع می‌شود.',
      },
    },
    formalTools: [
      {
        title: 'فرمول جواب بردار ویژه تعمیم‌یافته (صفحه ۲۳ و ۲۴ جزوه)',
        theoremName: 'ساخت جواب مستقل با بردارهای تعمیم‌یافته',
        latex:
          'X^{(k)}(t) = e^{rt} \\left[ I + (A - rI)t + \\frac{(A - rI)^2 t^2}{2!} + \\dots + \\frac{(A - rI)^{k-1} t^{k-1}}{(k-1)!} \\right] v^{(k)}',
        conditions: [
          'r مقدار ویژه با مرتبه تکرار m است.',
          '(A - rI)v^{(1)} = 0 با v^{(1)} \\ne 0 بردار ویژه معمولی است.',
          '(A - rI)^2 v^{(2)} = 0 اما (A - rI)v^{(2)} \\ne 0 بردار تعمیم‌یافته مرتبه ۲ است.',
        ],
      },
    ],
    examWalkthrough: {
      problemStatement:
        'دستگاه معادلات دیفرانسیل زیر را با روش مقادیر ویژه و بردارهای ویژه به طور کامل حل کنید (عین سوال ۴ میان‌ترم):',
      problemLatex:
        '\\dot{X} = \\begin{pmatrix} 3 & 1 & -1 \\\\ 2 & 2 & -1 \\\\ 2 & 2 & 0 \\end{pmatrix} X',
      steps: [
        {
          stepNumber: 1,
          stepTitle: 'محاسبه معادله مشخصه و ریشه‌ها',
          explanation:
            'دترمینان ماتریس A - rI را با عملیات سطری ساده می‌کنیم:',
          latex:
            '\\det(A - rI) = \\begin{vmatrix} 3-r & 1 & -1 \\\\ 2 & 2-r & -1 \\\\ 2 & 2 & -r \\end{vmatrix} = -(r-1)(r-2)^2 = 0',
          scoringTip: 'ریشه‌ها عبارتند از: r_1 = 1 (ساده) و r_2 = r_3 = 2 (مضاعف با تکرار ۲).',
        },
        {
          stepNumber: 2,
          stepTitle: 'یافتن بردار ویژه برای r_1 = 1',
          explanation:
            'حل دستگاه (A - I)v = 0:',
          latex:
            '\\begin{pmatrix} 2 & 1 & -1 \\\\ 2 & 1 & -1 \\\\ 2 & 2 & -1 \\end{pmatrix} \\begin{pmatrix} v_1 \\\\ v_2 \\\\ v_3 \\end{pmatrix} = 0 \\implies v_2 = 0, \\; v_3 = 2v_1 \\implies v^{(1)} = \\begin{pmatrix} 1 \\\\ 0 \\\\ 2 \\end{pmatrix}',
          scoringTip: 'جواب اول: X^{(1)}(t) = e^t \\begin{pmatrix} 1 \\\\ 0 \\\\ 2 \\end{pmatrix}.',
        },
        {
          stepNumber: 3,
          stepTitle: 'بررسی ریشه مضاعف r = 2 و کشف کمبود بردار ویژه',
          explanation:
            'دستگاه (A - 2I)v = 0 را تشکیل می‌دهیم:',
          latex:
            'A - 2I = \\begin{pmatrix} 1 & 1 & -1 \\\\ 2 & 0 & -1 \\\\ 2 & 2 & -2 \\end{pmatrix} \\implies \\begin{cases} v_1 + v_2 - v_3 = 0 \\\\ 2v_1 - v_3 = 0 \\end{cases} \\implies v_2 = v_1, \\; v_3 = 2v_1',
          scoringTip:
            'فقط یک بردار ویژه مستقل وجود دارد: v^{(2)} = \\begin{pmatrix} 1 \\\\ 1 \\\\ 2 \\end{pmatrix}. پس جواب دوم X^{(2)}(t) = e^{2t} \\begin{pmatrix} 1 \\\\ 1 \\\\ 2 \\end{pmatrix} است، اما به جواب سوم نیاز داریم!',
        },
        {
          stepNumber: 4,
          stepTitle: 'یافتن بردار ویژه تعمیم‌یافته با توان دوم (A - 2I)^2',
          explanation:
            'ماتریس (A - 2I)^2 را محاسبه می‌کنیم:',
          latex:
            '(A - 2I)^2 = \\begin{pmatrix} 1 & 1 & -1 \\\\ 2 & 0 & -1 \\\\ 2 & 2 & -2 \\end{pmatrix} \\begin{pmatrix} 1 & 1 & -1 \\\\ 2 & 0 & -1 \\\\ 2 & 2 & -2 \\end{pmatrix} = \\begin{pmatrix} 1 & -1 & 0 \\\\ 0 & 0 & 0 \\\\ 2 & -2 & 0 \\end{pmatrix}',
        },
        {
          stepNumber: 5,
          stepTitle: 'انتخاب بردار تعمیم‌یافته v^{(3)} و ساخت جواب سوم',
          explanation:
            'معادله (A - 2I)^2 v^{(3)} = 0 به ما می‌دهد: v_1 - v_2 = 0. با انتخاب $v_1 = 1$, v_2 = 1 و v_3 دلخواه (مثلاً v_3 = 1):',
          latex:
            'v^{(3)} = \\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\end{pmatrix} \\quad (A - 2I)v^{(3)} = \\begin{pmatrix} 1 \\\\ 1 \\\\ 2 \\end{pmatrix} \\ne 0',
        },
        {
          stepNumber: 6,
          stepTitle: 'محاسبه جواب سوم X^{(3)}(t) و جواب عمومی',
          explanation:
            'فرمول سری تیلور متوقف‌شده را اعمال می‌کنیم:',
          latex:
            'X^{(3)}(t) = e^{2t} [I + (A - 2I)t] v^{(3)} = e^{2t} \\left( \\begin{pmatrix} 1 \\\\ 1 \\\\ 1 \\end{pmatrix} + t \\begin{pmatrix} 1 \\\\ 1 \\\\ 2 \\end{pmatrix} \\right) = e^{2t} \\begin{pmatrix} t+1 \\\\ t+1 \\\\ 1+2t \\end{pmatrix}',
          scoringTip:
            'جواب عمومی نهایی: X(t) = c_1 X^{(1)}(t) + c_2 X^{(2)}(t) + c_3 X^{(3)}(t).',
        },
      ],
    },
    gotchas: [
      {
        title: 'انتخاب برداری که قبلاً بردار ویژه بوده است',
        warning:
          'باید مطمئن شوید بردار انتخابی v^{(3)} در شرط (A - 2I)v^{(3)} \\ne 0 صدق کند؛ اگر برداری انتخاب کنید که خودش در هسته A - 2I باشد، همان جواب تکراری را بازتولید کرده‌اید و نمره صفر می‌گیرید!',
        deductionReason: 'عدم استقلال خطی جواب سوم.',
      },
      {
        title: 'فراموش کردن ضریب e^{rt} پشت پرانتز',
        warning:
          'برخی دانشجویان می‌نویسند [I + (A-2I)t]v و فراموش می‌کنند کل این بردار در e^{2t} ضرب می‌شود.',
        deductionReason: 'خطای فرمولی در نگارش جواب عمومی.',
      },
    ],
    twinChallenge: {
      problemTitle: 'چالش شبیه‌ساز: دستگاه ۲ در ۲ با ریشه مضاعف',
      problemStatement:
        'دستگاه معادلات دیفرانسیل زیر را حل کرده و جواب عمومی را بیابید (مثال ۲.۱۲ جزوه):',
      problemLatex:
        '\\dot{X} = \\begin{pmatrix} 1 & -1 \\\\ 1 & 3 \\end{pmatrix} X',
      solutionSteps: [
        {
          stepTitle: 'معادله مشخصه',
          description:
            '\\det(A - rI) = (1-r)(3-r) + 1 = r^2 - 4r + 4 = (r-2)^2 = 0 \\implies r = 2 (مضاعف).',
          latex: 'r = 2',
        },
        {
          stepTitle: 'بردار ویژه اول',
          description:
            '(A - 2I)v = \\begin{pmatrix} -1 & -1 \\\\ 1 & 1 \\end{pmatrix} v = 0 \\implies v_2 = -v_1 \\implies v^{(1)} = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}',
          latex: 'X^{(1)}(t) = e^{2t} \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}',
        },
        {
          stepTitle: 'بردار ویژه تعمیم‌یافته',
          description:
            '(A - 2I)^2 = \\begin{pmatrix} 0 & 0 \\\\ 0 & 0 \\end{pmatrix}. هر برداری صفر می‌شود! بردار v^{(2)} = \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} را انتخاب می‌کنیم که (A-2I)v^{(2)} = \\begin{pmatrix} -2 \\\\ 2 \\end{pmatrix} \\ne 0.',
        },
        {
          stepTitle: 'ساخت جواب دوم',
          description:
            'X^{(2)}(t) = e^{2t} [v^{(2)} + t(A-2I)v^{(2)}] = e^{2t} \\left( \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix} + t \\begin{pmatrix} -2 \\\\ 2 \\end{pmatrix} \\right) = e^{2t} \\begin{pmatrix} 1 - 2t \\\\ 1 + 2t \\end{pmatrix}',
        },
      ],
      finalAnswer:
        'X(t) = c_1 e^{2t} \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix} + c_2 e^{2t} \\begin{pmatrix} 1 - 2t \\\\ 1 + 2t \\end{pmatrix}',
    },
  },

  // ==========================================
  // MODULE 3: ماتریس نمایی و تغییر پارامترها
  // ==========================================
  {
    id: 'module-3',
    number: 3,
    phaseId: 1,
    phaseName: 'فاز ۱: دستگاه‌های خطی و جبر ماتریسی',
    title: 'ماتریس نمایی $e^{At}$ و دستگاه‌های ناهمگن',
    subtitle: 'فرمول $e^{At}$ = $\psi(t)$$\psi^{-1}(0)$، اثبات جابه‌جایی و روش تغییر پارامترها',
    examScoreEstimate: '۵ نمره قطعی',
    lecturePages: 'صفحات ۲۲ تا ۲۸ جزوه',
    examRef: 'سوال ۵ و ۶ نمونه‌سوالات میان‌ترم',
    prerequisiteBridge: [
      'تعریف معکوس ماتریس ۲ در ۲: \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}^{-1} = \\frac{1}{ad-bc} \\begin{pmatrix} d & -b \\\\ -c & a \\end{pmatrix}',
      'مفهوم ماتریس اساسی $\psi(t)$: ستون‌های آن جواب‌های مستقل خطی دستگاه هستند.',
      'خاصیت مشتق تابع ماتریسی: \\frac{d}{dt}(AB) = \\dot{A}B + A\\dot{B} (ترتیب ماتریس‌ها حفظ می‌شود).',
    ],
    intuition: {
      summary:
        'چرا برای اعداد e^{at} جواب \\dot{x} = ax است اما برای ماتریس‌ها نمی‌توانیم درجا جواب بنویسیم؟ چون ماتریس‌ها خاصیت جابه‌جایی ندارند (AB \\ne BA)! اگر ماتریس اساسی $\psi(t)$ را داشته باشیم، ماتریس نمایی دقیقاً برابر است با $e^{At}$ = $\psi(t)$$\psi^{-1}(0)$. همچنین اگر دو ماتریس جابه‌جاپذیر باشند ($AB = BA$)، ماتریس نمایی هم با آن‌ها جابه‌جا می‌شود ($e^{At}B = Be^{At}$). برای دستگاه‌های ناهمگن $\dot{X} = AX$ + g(t) هم دقیقاً مانند معادلات مرتبه اول با روش تغییر پارامترها فرمول U(t) = \\int \\psi^{-1}(t)g(t)dt را به دست می‌آوریم.',
      whyItMatters:
        'سوال ۶ میان‌ترم صراحتاً اثبات خاصیت جابه‌جایی $e^{At}B = Be^{At}$ بود، و سوال ۵ محاسبه $e^{At}$ با استفاده از ماتریس اساسی بود.',
      microCheck: {
        question:
          'اگر تابع کمکی F(t) = $e^{At}$ B $e^{-At}$ را تعریف کنیم، مشتق F\'(t) با فرض $AB = BA$ برابر چیست؟',
        hint: 'از مشتق ضرب استفاده کنید و $e^{At}$ و $e^{-At}$ را فاکتور بگیرید.',
        answerLatex: 'F\'(t) = $e^{At}$(AB - BA)$e^{-At}$ = 0_{n \\times n}',
        answerExplanation:
          'چون F\'(t) = 0 است، تابع F(t) ماتریس ثابت است. با قرار دادن t=0 نتیجه می‌شود F(t) = F(0) = B و لذا $e^{At}B = Be^{At}$. این کوتاه‌ترین و شیک‌ترین اثبات امتحانی است!',
      },
    },
    formalTools: [
      {
        title: 'ارتباط ماتریس اساسی و تابع نمایی (قضیه ۲.۱۵ جزوه)',
        theoremName: 'فرمول ماتریس نمایی',
        latex: '$e^{At}$ = $\psi(t)$ $\psi^{-1}(0)$',
        conditions: [
          '$\psi(t)$ یک ماتریس اساسی دستگاه $\dot{X} = AX$ است (ستون‌های آن مستقل خطی هستند).',
          '\\det $\psi(t)$ \\ne 0 به ازای تمام t.',
        ],
      },
      {
        title: 'فرمول روش تغییر پارامترها برای دستگاه ناهمگن (صفحه ۲۷ جزوه)',
        theoremName: 'جواب خصوصی دستگاه ناهمگن',
        latex:
          'X(t) = $\psi(t)$C + $\psi(t)$ \\int \\psi^{-1}(t) g(t) \\, dt',
        conditions: [
          'دستگاه به فرم $\dot{X} = AX$ + g(t) است.',
          'فرض می‌کنیم X_p(t) = $\psi(t)$ U(t) و به رابطه $\psi(t)$\\dot{U}(t) = g(t) می‌رسیم.',
        ],
      },
    ],
    examWalkthrough: {
      problemStatement:
        'الف) ثابت کنید اگر $AB = BA$، آنگاه $e^{At}B = Be^{At}$ (سوال ۶ میان‌ترم).\nب) برای ماتریس زیر، $e^{At}$ را با استفاده از ماتریس اساسی محاسبه کنید (سوال ۵ میان‌ترم):',
      problemLatex:
        'A = \\begin{pmatrix} 3 & 5 \\\\ -5 & -3 \\end{pmatrix}',
      steps: [
        {
          stepNumber: 1,
          stepTitle: 'اثبات خاصیت جابه‌جایی با بسط سری مک‌لورن (روش ۱ امتحانی)',
          explanation:
            'تعریف سری ماتریس نمایی را می‌نویسیم و B را ضرب می‌کنیم:',
          latex:
            '$e^{At}B$ = \\left( \\sum_{n=0}^\\infty \\frac{t^n}{n!} A^n \\right) B = \\sum_{n=0}^\\infty \\frac{t^n}{n!} (A^n B)',
        },
        {
          stepNumber: 2,
          stepTitle: 'اثبات A^n B = B A^n با استقرای ریاضی',
          explanation:
            'برای n=1 فرض سوال $AB = BA$ برقرار است. فرض استقرا: A^k B = B A^k. برای گام استقرا:',
          latex:
            'A^{k+1}B = A^k (AB) = A^k (BA) = (A^k B) A = (B A^k) A = B A^{k+1}',
          scoringTip:
            'نوشتن دقیق گام استقرا تمام نمره این بخش را تضمین می‌کند. در نتیجه: $e^{At}B$ = \\sum \\frac{t^n}{n!} B A^n = B \\sum \\frac{t^n}{n!} A^n = $Be^{At}$.',
        },
        {
          stepNumber: 3,
          stepTitle: 'محاسبه مقادیر ویژه ماتریس A برای بخش (ب)',
          explanation:
            'معادله مشخصه را تشکیل می‌دهیم:',
          latex:
            '\\det(A - rI) = \\begin{vmatrix} 3-r & 5 \\\\ -5 & -3-r \\end{vmatrix} = -(9 - r^2) + 25 = r^2 + 16 = 0 \\implies r = $\pm 4i$',
        },
        {
          stepNumber: 4,
          stepTitle: 'یافتن دو جواب مستقل خطی و تشکیل ماتریس اساسی',
          explanation:
            'برای r = 4i: (A - 4i I)v = 0 \\implies (3 - 4i)v_1 + 5v_2 = 0 \\implies v = \\begin{pmatrix} 5 \\\\ -3 + 4i \\end{pmatrix}.',
          latex:
            'X_{comp}(t) = (\\cos 4t + i\\sin 4t) \\left( \\begin{pmatrix} 5 \\\\ -3 \\end{pmatrix} + i \\begin{pmatrix} 0 \\\\ 4 \\end{pmatrix} \\right)',
        },
        {
          stepNumber: 5,
          stepTitle: 'استخراج بخش‌های حقیقی و تشکیل ماتریس اساسی $\psi(t)$',
          explanation:
            'ستون‌های $\psi(t)$ بخش حقیقی و موهومی جواب هستند:',
          latex:
            '$\psi(t)$ = \\begin{pmatrix} 5\\cos 4t & 5\\sin 4t \\\\ -3\\cos 4t - 4\\sin 4t & -3\\sin 4t + 4\\cos 4t \\end{pmatrix}',
        },
        {
          stepNumber: 6,
          stepTitle: 'محاسبه $\psi(0)$ و معکوس آن $\psi^{-1}(0)$',
          explanation:
            'در نقطه t = 0 مقدار ماتریس اساسی را به دست می‌آوریم:',
          latex:
            '$\psi(0)$ = \\begin{pmatrix} 5 & 0 \\\\ -3 & 4 \\end{pmatrix} \\implies \\det $\psi(0)$ = 20 \\implies $\psi^{-1}(0)$ = \\frac{1}{20} \\begin{pmatrix} 4 & 0 \\\\ 3 & 5 \\end{pmatrix}',
        },
        {
          stepNumber: 7,
          stepTitle: 'محاسبه ضرب ماتریسی نهایی $e^{At}$ = $\psi(t)$$\psi^{-1}(0)$',
          explanation:
            'با ضرب دو ماتریس:',
          latex:
            '$e^{At}$ = $\psi(t)$ $\psi^{-1}(0)$ = \\begin{pmatrix} \\cos 4t + \\frac{3}{4}\\sin 4t & \\frac{5}{4}\\sin 4t \\\\ -\\frac{5}{4}\\sin 4t & \\cos 4t - \\frac{3}{4}\\sin 4t \\end{pmatrix}',
          scoringTip:
            'آزمون سریع صحت: برای t=0 بررسی کنید که آیا ماتریس همانی I به دست می‌آید یا نه! اینجا \\cos 0 = 1 و \\sin 0 = 0 که دقیقاً I میگردد.',
        },
      ],
    },
    gotchas: [
      {
        title: 'ضرب اشتباه در فرمول $e^{At}$ = $\psi^{-1}(0)$$\psi(t)$',
        warning:
          'ترتیب در ماتریس‌ها فوق‌العاده حیاتی است! فرمول صحیح $e^{At}$ = $\psi(t)$$\psi^{-1}(0)$ است؛ $\psi^{-1}(0)$ حتماً در سمت راست ضرب می‌شود نه چپ!',
        deductionReason: 'خطای بنیادین در فرمول ماتریس نمایی.',
      },
    ],
    twinChallenge: {
      problemTitle: 'چالش شبیه‌ساز: محاسبه $e^{At}$ برای ماتریس قطری بلوکی',
      problemStatement:
        'ماتریس نمایی $e^{At}$ را برای ماتریس زیر محاسبه کنید (تمرین ۲.۱۶ جزوه):',
      problemLatex:
        'A = \\begin{pmatrix} 2 & -1 \\\\ 1 & 4 \\end{pmatrix}',
      solutionSteps: [
        {
          stepTitle: 'مقادیر ویژه',
          description:
            '\\det(A - rI) = (2-r)(4-r) + 1 = r^2 - 6r + 9 = (r-3)^2 = 0 \\implies r = 3 (مضاعف).',
        },
        {
          stepTitle: 'جواب‌های مستقل',
          description:
            'v^{(1)} = \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix} \\implies X^{(1)} = e^{3t} \\begin{pmatrix} 1 \\\\ -1 \\end{pmatrix}. بردار تعمیم‌یافته: v^{(2)} = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix} \\implies X^{(2)} = e^{3t} \\begin{pmatrix} 1 - t \\\\ t \\end{pmatrix}.',
        },
        {
          stepTitle: 'ماتریس اساسی در مبدأ',
          description:
            '$\psi(t)$ = e^{3t}\\begin{pmatrix} 1 & 1-t \\\\ -1 & t \\end{pmatrix} \\implies $\psi(0)$ = \\begin{pmatrix} 1 & 1 \\\\ -1 & 0 \\end{pmatrix} \\implies $\psi^{-1}(0)$ = \\begin{pmatrix} 0 & -1 \\\\ 1 & 1 \\end{pmatrix}',
        },
      ],
      finalAnswer:
        '$e^{At}$ = e^{3t} \\begin{pmatrix} 1 - t & -t \\\\ t & 1 + t \\end{pmatrix}',
    },
  },

  // ==========================================
  // PHASE 2: اثبات‌های آنالیزی (پیکارد و گرونوال)
  // ==========================================
  {
    id: 'module-4',
    number: 4,
    phaseId: 2,
    phaseName: 'فاز ۲: وجود، یکتایی و تحلیل آنالیزی',
    title: 'تقریب‌های متوالی پیکارد و بررسی شرط لیپشیتز',
    subtitle: 'الگوریتم تقریب پیکارد، یافتن فرم بسته جواب و تحلیل مثال نقض کلاسیک y\' = \\sqrt{|y|}',
    examScoreEstimate: '۴ تا ۵ نمره قطعی',
    lecturePages: 'صفحات ۲ تا ۸ جزوه',
    examRef: 'سوال ۳ نمونه‌سوالات میان‌ترم و تمرین ۱.۸ جزوه',
    prerequisiteBridge: [
      'انتگرال توابع چندجمله‌ای: \\int t^n dt = \\frac{t^{n+1}}{n+1}',
      'بسط مک‌لورن تابع نمایی: e^x = \\sum_{n=0}^\\infty \\frac{x^n}{n!}',
      'تعریف شرط لیپشیتز نسبت به y: |f(x, y_1) - f(x, y_2)| \\le L |y_1 - y_2|',
    ],
    intuition: {
      summary:
        'قضیه پیکارد به ما یاد می‌دهد که هر معادله دیفرانسیل مقدار اولیه y\' = f(x,y) با شرط y($x_0$)=y_0 معادل یک معادله انتگرالی y(x) = y_0 + \\int_{$x_0$}^x f(t,y(t))dt است. از این معادله یک موتور تولید جواب می‌سازیم: y_0(x) = y_0 را حدس می‌زنیم، آن را درون انتگرال می‌اندازیم تا y_1 ساخته شود، سپس y_1 را می‌اندازیم تا y_2 ساخته شود و الی آخر. اما این موتور یک شرط امنیتی حیاتی دارد: تابع f باید نسبت به y لیپشیتز باشد. اگر مشتق \\partial f / \\partial y بی‌نهایت شود (مثل y\' = \\sqrt{|y|} در مبدأ)، تضمین یکتایی از بین می‌رود و معادله می‌تواند بی‌نهایت جواب مختلف داشته باشد!',
      whyItMatters:
        'سوال ۳ میان‌ترم دقیقاً همین مثال نقض y\' = \\sqrt{|y|} بود. دکتر شهروزی می‌خواهد ببیند آیا دانشجو علت دقیق نقض شرط پیکارد را متوجه شده است یا نه.',
      microCheck: {
        question:
          'برای تابع f(x,y) = \\sqrt{|y|}، حاصل حد مشتق جزئی \\lim_{y \\to 0} \\frac{f(x,y) - f(x,0)}{y - 0} چیست؟',
        hint: 'از تعریف مشتق استفاده کنید و y مثبت به سمت صفر را در نظر بگیرید.',
        answerLatex: '\\lim_{y \\to 0^+} \\frac{\\sqrt{y}}{y} = \\lim_{y \\to 0^+} \\frac{1}{\\sqrt{y}} = +\\infty',
        answerExplanation:
          'چون مشتق جزئی در همسایگی صفر کراندار نیست، شرط کافی لیپشیتز نقض می‌شود و قضیه پیکارد نمی‌تواند یکتایی جواب را تضمین کند.',
      },
    },
    formalTools: [
      {
        title: 'رابطه بازگشتی تقریب‌های متوالی پیکارد (صفحه ۴ جزوه)',
        theoremName: 'فرمول تکرار پیکارد',
        latex:
          'y_0(x) = y_0, \\quad y_{n+1}(x) = y_0 + \\int_{$x_0$}^x f(t, y_n(t)) \\, dt',
        conditions: [
          'f روی مستطیل R پیوسته و نسبت به y با ثابت L لیپشیتز باشد.',
          'جواب در بازه |x - $x_0$| \\le h با h = \\min(a, b/M) یکتا است.',
        ],
      },
      {
        title: 'شرط کافی لیپشیتز بودن (لم ۱.۴ جزوه)',
        theoremName: 'کرانداری مشتق جزئی',
        latex:
          '\\left| \\frac{\\partial f}{\\partial y} \\right| \\le M \\implies f \\in C_{\\text{Lip}}',
        conditions: [
          'اگر \\frac{\\partial f}{\\partial y} در دامنه کراندار باشد، طبق قضیه مقدار میانگین تابع حتماً لیپشیتز است.',
        ],
      },
    ],
    examWalkthrough: {
      problemStatement:
        'مسئله مقدار اولیه y\' = \\sqrt{|y|}, $y(0) = 0$ را در نظر بگیرید:\nالف) نشان دهید توابع y_1(x) \\equiv 0 و y_2(x) = \\begin{cases} 0 & x \\le 0 \\\\ x^2/4 & x > 0 \\end{cases} هر دو جواب مسئله هستند.\nب) توضیح دهید چرا این مثال قضیه وجود و یکتایی پیکارد را نقض نمی‌کند؟ (عین سوال ۳ میان‌ترم)',
      problemLatex:
        'y\' = \\sqrt{|y|}, \\quad $y(0) = 0$',
      steps: [
        {
          stepNumber: 1,
          stepTitle: 'بررسی جواب بودن y_1(x) \\equiv 0',
          explanation:
            'تابع صفر پیوسته است و در شرط اولیه y_1(0) = 0 صدق می‌کند. همچنین:',
          latex:
            'y_1\'(x) = 0, \\quad \\sqrt{|y_1(x)|} = \\sqrt{0} = 0 \\implies y_1\' = \\sqrt{|y_1|} \\quad \\checkmark',
        },
        {
          stepNumber: 2,
          stepTitle: 'بررسی جواب بودن قطعه‌ای y_2(x)',
          explanation:
            'برای x \\le 0 که y_2 = 0 است مشتق صفر و مساوی رادیکال صفر است. برای x > 0 داریم y_2(x) = x^2 / 4:',
          latex:
            'y_2\'(x) = \\frac{2x}{4} = \\frac{x}{2}, \\quad \\sqrt{|y_2(x)|} = \\sqrt{\\frac{x^2}{4}} = \\frac{x}{2} \\implies y_2\' = \\sqrt{|y_2|} \\quad \\checkmark',
          scoringTip:
            'حتماً پیوستگی و مشتق‌پذیری در نقطه مرزی x=0 را چک کنید: مشتق چپ و راست هر دو در صفر برابر صفرند.',
        },
        {
          stepNumber: 3,
          stepTitle: 'بررسی شرط قضیه پیکارد و نقض شرط لیپشیتز',
          explanation:
            'مشتق جزئی f(x,y) = \\sqrt{|y|} نسبت به y را در همسایگی صفر بررسی می‌کنیم:',
          latex:
            '\\frac{\\partial f}{\\partial y}(x, 0) = \\lim_{y \\to 0} \\frac{\\sqrt{|y|} - 0}{|y|} = \\lim_{y \\to 0} \\frac{1}{\\sqrt{|y|}} = \\infty',
        },
        {
          stepNumber: 4,
          stepTitle: 'نتیجه‌گیری منطقی امتحانی (جمع‌بندی نهایی)',
          explanation:
            'چون \\frac{\\partial f}{\\partial y} در هیچ همسایگی مبدأ کراندار نیست، تابع f نسبت به y لیپشیتز نمی‌باشد. بنابراین قضیه پیکارد اصلاً در این نقطه برقرار نیست؛ قضیه‌ای که فرضیاتش برقرار نباشد، هیچ ادعایی درباره یکتایی ندارد، پس وجود دو جواب متمایز نقض‌کننده قضیه نیست!',
          scoringTip:
            'نکته طلایی استاد: در تکرار پیکارد در این مثال، تمام تقریب‌ها صفر می‌شوند: y_0 = 0, y_1 = 0, y_2 = 0, \\dots و فقط جواب بدیهی را می‌یابند.',
        },
      ],
    },
    gotchas: [
      {
        title: 'نوشتن اینکه «این مثال قضیه پیکارد را باطل می‌کند»!',
        warning:
          'مراقب باشید نگویید قضیه پیکارد غلط از آب درآمده! قضیه یک قضیه شرطی است: «اگر فرضیات برقرار باشد، جواب یکتاست». وقتی فرض لیپشیتز برقرار نباشد، قضیه نقض نشده، بلکه از شمول آن خارج شده است.',
        deductionReason: 'درک نادرست از ساختار منطقی قضایای ریاضی.',
      },
    ],
    twinChallenge: {
      problemTitle: 'چالش شبیه‌ساز: محاسبه سه تقریب اول پیکارد',
      problemStatement:
        'با الگوی تکرارشونده پیکارد، سه تقریب اول y_1, y_2, y_3 را برای مسئله زیر بیابید و جواب دقیق را بنویسید (تمرین ۱.۸ جزوه):',
      problemLatex:
        'y\' = 2x - y, \\quad y(0) = 1',
      solutionSteps: [
        {
          stepTitle: 'تقریب صفر و فرمول انتگرالی',
          description:
            'y_0(x) = 1, \\quad y_{n+1}(x) = 1 + \\int_0^x (2t - y_n(t)) dt',
        },
        {
          stepTitle: 'محاسبه y_1(x)',
          description:
            'y_1(x) = 1 + \\int_0^x (2t - 1) dt = 1 + x^2 - x = 1 - x + x^2',
        },
        {
          stepTitle: 'محاسبه y_2(x)',
          description:
            'y_2(x) = 1 + \\int_0^x (2t - 1 + t - t^2) dt = 1 - x + \\frac{3}{2}x^2 - \\frac{1}{3}x^3',
        },
        {
          stepTitle: 'حد دنباله و جواب تحلیلی',
          description:
            'با ادامه این روند: y_n(x) \\to 2x - 2 + 3 \\sum_{k=0}^\\infty \\frac{(-x)^k}{k!} = 2x - 2 + 3e^{-x}.',
        },
      ],
      finalAnswer: 'y(x) = 2x - 2 + 3e^{-x}',
    },
  },

  // ==========================================
  // MODULE 5: لم گرونوال و وابستگی به شرایط اولیه
  // ==========================================
  {
    id: 'module-5',
    number: 5,
    phaseId: 2,
    phaseName: 'فاز ۲: وجود، یکتایی و تحلیل آنالیزی',
    title: 'لم گرونوال، اثبات یکتایی و وابستگی به داده‌های اولیه',
    subtitle: 'اثبات نامساوی گرونوال، اثبات یکتایی جواب و جابه‌جایی نقطه شروع از $x_0$ به $x_1$',
    examScoreEstimate: '۶ نمره قطعی (سوگلی امتحان)',
    lecturePages: 'صفحات ۷ تا ۱۲ جزوه',
    examRef: 'سوال ۱ و ۲ نمونه‌سوالات میان‌ترم',
    prerequisiteBridge: [
      'روش عامل انتگرال‌ساز برای نامساوی‌ها: (e^{-Bx}W(x))\' = e^{-Bx}(W\'(x) - BW(x))',
      'تعریف تابع کمکی W(x) = A + B \\int_{$x_0$}^x u(t)dt',
      'روش اثبات به برهان خلف (Proof by Contradiction).',
    ],
    intuition: {
      summary:
        'لم گرونوال قدرتمندترین چکش آنالیز در معادلات دیفرانسیل است! این لم می‌گوید اگر یک مقدار مجهول u(x) کمتر مساوی یک انتگرال از خودش باشد، رشد آن نمی‌تواند از یک تابع نمایی بیشتر شود: u(x) \\le A e^{B(x-$x_0$)}. حالا جادوی اصلی چیست؟ اگر A = 0 باشد، نامساوی به ما می‌دهد u(x) \\le 0 e^{\\dots} = 0! چون u(x) = |y_1 - y_2| قدرمطلق و نامنفی است، نتیجه می‌گیریم u(x) \\equiv 0، یعنی دو جواب حتماً بر هم منطبق هستند (اثبات یکتایی!). همین تکنیک برای اثبات پایداری و وابستگی پیوسته به شرایط اولیه استفاده می‌شود.',
      whyItMatters:
        'استاد شهروزی در ۹۰٪ امتحاناتش صورت و اثبات کامل لم گرونوال یا اثبات یکتایی با آن را می‌خواهد (سوال ۱ و ۲ میان‌ترم).',
      microCheck: {
        question:
          'اگر در نامساوی انتگرالی u(x) \\le A + B \\int_{$x_0$}^x u(t) dt مقدار ثابت A برابر صفر باشد، لم گرونوال چه نتیجه‌ای می‌دهد؟',
        hint: 'به رابطه u(x) \\ge 0 برای قدرمطلق دقت کنید.',
        answerLatex: 'u(x) \\le 0 \\cdot e^{B|x-$x_0$|} = 0 \\implies u(x) \\equiv 0',
        answerExplanation:
          'چون u(x) همواره نامنفی است و همزمان \\le 0 شده است، تنها مقدار ممکن صفر مطلق است. این کلید اثبات یکتایی جواب است.',
      },
    },
    formalTools: [
      {
        title: 'صورت دقیق لم گرونوال (لم ۱.۹ جزوه)',
        theoremName: 'Gronwall\'s Inequality',
        latex:
          'u(x) \\le A + B \\left| \\int_{$x_0$}^x u(t) \\, dt \\right| \\implies u(x) \\le A e^{B|x - $x_0$|}',
        conditions: [
          'u(x) پیوسته و نامنفی (u(x) \\ge 0) روی بازه I شامل $x_0$.',
          'A و B ثابت‌های نامنفی هستند (A, B \\ge 0).',
        ],
      },
      {
        title: 'قضیه وابستگی به شرط اولیه (قضیه ۱.۱۰ جزوه)',
        theoremName: 'پیوستگی نسبت به داده‌های اولیه',
        latex:
          '|\\phi(x) - \\psi(x)| \\le |y_0 - \\hat{y}_0| e^{L|x - $x_0$|}',
        conditions: [
          '\\phi جواب با مقدار اولیه y($x_0$) = y_0 و \\psi جواب با مقدار اولیه y($x_0$) = \\hat{y}_0 است.',
          'L ثابت لیپشیتز تابع f است.',
        ],
      },
    ],
    examWalkthrough: {
      problemStatement:
        'الف) لم گرونوال را اثبات کنید.\nب) نشان دهید اگر f در شرط لیپشیتز صدق کند، معادله انتگرالی y(x) = 1 + \\int_3^x f(t,y(t))dt حداکثر یک جواب دارد (سوال ۱ میان‌ترم).\nج) اثبات قضیه جابه‌جایی نقطه شروع از $x_0$ به $x_1$ (سوال ۲ میان‌ترم).',
      problemLatex:
        '|y(x) - \\tilde{y}(x)| \\le M|$x_1$ - $x_0$| e^{L|x - $x_1$|}',
      steps: [
        {
          stepNumber: 1,
          stepTitle: 'اثبات کامل لم گرونوال با تابع کمکی W(x)',
          explanation:
            'فرض می‌کنیم x \\ge $x_0$. تابع کمکی W(x) = A + B \\int_{$x_0$}^x u(t)dt را تعریف می‌کنیم:',
          latex:
            'W($x_0$) = A, \\quad u(x) \\le W(x), \\quad W\'(x) = B u(x) \\le B W(x) \\implies W\'(x) - B W(x) \\le 0',
        },
        {
          stepNumber: 2,
          stepTitle: 'ضرب در عامل انتگرال‌ساز e^{-Bx} و انتگرال‌گیری',
          explanation:
            'طرفین را در e^{-Bx} ضرب کرده و از $x_0$ تا x انتگرال می‌گیریم:',
          latex:
            '(e^{-Bx}W(x))\' \\le 0 \\implies e^{-Bx}W(x) - e^{-B$x_0$}W($x_0$) \\le 0 \\implies W(x) \\le A e^{B(x - $x_0$)}',
          scoringTip:
            'چون u(x) \\le W(x) است، پس u(x) \\le A e^{B(x-$x_0$)} ثابت شد. برای x < $x_0$ اثبات دقیقاً با تغییر علامت مشابه است.',
        },
        {
          stepNumber: 3,
          stepTitle: 'اثبات یکتایی با گرونوال (حل بخش ب - سوال ۱ میان‌ترم)',
          explanation:
            'به برهان خلف فرض می‌کنیم دو جواب y_1(x) و y_2(x) وجود داشته باشند. تفاضل آن‌ها:',
          latex:
            '|y_1(x) - y_2(x)| = \\left| \\int_3^x [f(t, y_1(t)) - f(t, y_2(t))] dt \\right| \\le \\int_3^x L |y_1(t) - y_2(t)| dt',
        },
        {
          stepNumber: 4,
          stepTitle: 'اعمال لم گرونوال با A = 0 و B = L',
          explanation:
            'قرار می‌دهیم u(x) = |y_1(x) - y_2(x)|. داریم u(x) \\le 0 + L \\int_3^x u(t)dt. طبق گرونوال:',
          latex:
            'u(x) \\le 0 \\cdot e^{L|x - 3|} = 0 \\implies |y_1(x) - y_2(x)| \\le 0 \\implies y_1(x) \\equiv y_2(x)',
          scoringTip: 'حکم یکتایی اثبات شد! توجه کنید که نقطه شروع انتگرال ۳ بوده است.',
        },
        {
          stepNumber: 5,
          stepTitle: 'اثبات قضیه سوال ۲ میان‌ترم (تغییر نقطه شروع از $x_0$ به $x_1$)',
          explanation:
            'داریم y(x) = y_0 + \\int_{$x_0$}^x f(t,y)dt و \\tilde{y}(x) = y_0 + \\int_{$x_1$}^x f(t,\\tilde{y})dt. بدون کاستن از کلیت فرض می‌کنیم $x_0$ < $x_1$:',
          latex:
            'y(x) - \\tilde{y}(x) = \\int_{$x_0$}^x f(t,y)dt - \\int_{$x_1$}^x f(t,\\tilde{y})dt = \\int_{$x_0$}^{$x_1$} f(t,y)dt + \\int_{$x_1$}^x [f(t,y) - f(t,\\tilde{y})]dt',
        },
        {
          stepNumber: 6,
          stepTitle: 'کرانداری با M و شرط لیپشیتز و نتیجه‌گیری با گرونوال',
          explanation:
            'چون f با M کراندار است و نسبت به y با ثابت L لیپشیتز است:',
          latex:
            '|y(x) - \\tilde{y}(x)| \\le M($x_1$ - $x_0$) + L \\int_{$x_1$}^x |y(t) - \\tilde{y}(t)| dt',
          scoringTip:
            'طبق لم گرونوال با A = M($x_1$ - $x_0$) و B = L و نقطه مبنای $x_1$:\n|y(x) - \\tilde{y}(x)| \\le M|$x_1$ - $x_0$| e^{L|x - $x_1$|}. حکم ثابت شد!',
        },
      ],
    },
    gotchas: [
      {
        title: 'فراموش کردن کرانداری تابع f در سوال ۲',
        warning:
          'باید در گام تفکیک انتگرال صریحاً بنویسید: «چون f کراندار با کران M است، پس |\\int_{$x_0$}^{$x_1$} f dt| \\le M|$x_1$ - $x_0$|». اگر این را ننویسید، ضریب M از کجا آمد؟',
        deductionReason: 'عدم ذکر فرض کرانداری f در پاسخنامه.',
      },
    ],
    twinChallenge: {
      problemTitle: 'چالش شبیه‌ساز: وابستگی به خطای تابع معادله',
      problemStatement:
        'ثابت کنید اگر |f(x,y) - \\hat{f}(x,y)| \\le \\varepsilon باشد، فاصله جواب‌های دو معادله با شرط اولیه یکسان صدق می‌کند در (قضیه ۱.۱۱ جزوه):',
      problemLatex:
        '|\\phi(x) - \\psi(x)| \\le \\frac{\\varepsilon}{L}(e^{Lh} - 1)',
      solutionSteps: [
        {
          stepTitle: 'تشکیل تفاضل انتگرالی',
          description:
            '|\\phi(x) - \\psi(x)| \\le \\int_{$x_0$}^x |f(t,\\phi) - \\hat{f}(t,\\psi)| dt \\le \\int_{$x_0$}^x |f(t,\\phi) - f(t,\\psi)| dt + \\int_{$x_0$}^x |f(t,\\psi) - \\hat{f}(t,\\psi)| dt',
        },
        {
          stepTitle: 'اعمال فرضیات',
          description:
            '\\le L \\int_{$x_0$}^x |\\phi - \\psi| dt + \\varepsilon(x - $x_0$)',
        },
        {
          stepTitle: 'اعمال لم گرونوال تعمیم‌یافته',
          description:
            'طبق فرم تعمیم‌یافته با تابع غیرثابت یا با استقرا روی جملات پیکارد، حاصل جمع سری تیلور به رابطه فوق همگرا می‌شود.',
        },
      ],
      finalAnswer: '|\\phi(x) - \\psi(x)| \\le \\frac{\\varepsilon}{L}(e^{Lh} - 1)',
    },
  },

  // ==========================================
  // PHASE 3: قضایای کیفی و اشتورم-لیوویل
  // ==========================================
  {
    id: 'module-6',
    number: 6,
    phaseId: 3,
    phaseName: 'فاز ۳: رفتار کیفی، نوسان و اشتورم-لیوویل',
    title: 'فرم خودالحاق و رفتار نوسانی صفرها',
    subtitle: 'شرط خودالحاقی $\dot{a}_0 = a_1$، عامل انتگرال‌ساز $\mu(t)$ و اثبات نامتناهی بودن صفرهای مثبت',
    examScoreEstimate: '۴ تا ۵ نمره قطعی',
    lecturePages: 'صفحات ۲۸ تا ۳۲ جزوه',
    examRef: 'سوال ۷ نمونه‌سوالات میان‌ترم و قضیه ۳.۴ و ۳.۵ جزوه',
    prerequisiteBridge: [
      'مشتق ضرب توابع و قاعده لایبنیتز: \\frac{d}{dt}[P(t)\\dot{x}] = P(t)\\ddot{x} + \\dot{P}(t)\\dot{x}',
      'مفهوم تقعر در حساب دیفرانسیل: اگر $\ddot{x} < 0$ باشد، منحنی مقعر (رو به پایین) است و خط مماس بالای نمودار قرار می‌گیرد.',
      'قضیه مقدار میانگین و برهان خلف برای اثبات رفتار نوسانی.',
    ],
    intuition: {
      summary:
        'یک معادله مرتبه دوم a_0 \\ddot{x} + a_1 \\dot{x} + a_2 x = 0 زمانی زیبا و فیزیکی رفتار می‌کند که «خودالحاق» (Self-Adjoint) باشد. شرطش خیلی ساده است: مشتق ضریب اول باید مساوی ضریب دوم باشد ($\dot{a}_0 = a_1$)! اگر نباشد، با یک عامل انتگرال‌ساز $\mu(t)$ = \\frac{1}{a_0}e^{\\int (a_1/a_0)dt} آن را به فرم استاندارد اشتورم-لیوویل (P(t)\\dot{x})\' + Q(t)x = 0 تبدیل می‌کنیم. حالا سوال امتحانی هیجان‌انگیز چیست؟ نشان دهید معادله x\'\' + (t+1)x = 0 بی‌نهایت بار نوسان می‌کند و ریشه‌های مثبت نامتناهی دارد! با برهان خلف فرض می‌کنیم آخرین ریشه t_m باشد، آنگاه تقعر نمودار رو به پایین است و خط مماس نمودار را مجبور می‌کند محور t را قطع کند که تناقض است!',
      whyItMatters:
        'سوال ۷ میان‌ترم دقیقاً همین اثبات نامتناهی بودن صفرها برای x\'\' + (t+1)x = 0 بود. این سوال نشان می‌دهد آیا دانشجو تقعر و رفتار کیفی جواب‌ها را عمیق فهمیده است یا خیر.',
      microCheck: {
        question:
          'شرط لازم و کافی برای اینکه معادله a_0(t)\\ddot{x} + a_1(t)\\dot{x} + a_2(t)x = 0 خودالحاق باشد چیست؟',
        hint: 'به تعریف معادله الحاقی در صفحه ۲۸ جزوه نگاه کنید.',
        answerLatex: '\dot{a}_0(t) = a_1(t)',
        answerExplanation:
          'با بسط معادله الحاقی و مقایسه ضرایب، شرط تساوی ضریب مشتق اول با معادله اصلی مستقیماً به رابطه $\dot{a}_0 = a_1$ می‌انجامد.',
      },
    },
    formalTools: [
      {
        title: 'عامل خودالحاق‌کننده (قضیه ۳.۵ جزوه)',
        theoremName: 'تبدیل به فرم استاندارد اشتورم-لیوویل',
        latex:
          '$\mu(t)$ = \\frac{1}{a_0(t)} \\exp\\left( \\int \\frac{a_1(t)}{a_0(t)} \\, dt \\right) \\implies \\frac{d}{dt}[P(t)\\dot{x}] + Q(t)x = 0',
        conditions: [
          'a_0(t) \\ne 0 روی بازه I.',
          'P(t) = \\exp(\\int \\frac{a_1}{a_0}dt) و Q(t) = \\frac{a_2}{a_0} P(t).',
        ],
      },
    ],
    examWalkthrough: {
      problemStatement:
        'نشان دهید هر جواب حقیقی غیربدیهی از معادله دیفرانسیل زیر دارای تعداد نامتناهی صفر مثبت است (سوال ۷ میان‌ترم):',
      problemLatex:
        '\\frac{d^2 x}{dt^2} + (t+1)x = 0',
      steps: [
        {
          stepNumber: 1,
          stepTitle: 'طرح برهان خلف و فرض متناهی بودن صفرها',
          explanation:
            'به برهان خلف فرض می‌کنیم جواب x(t) در بازه [0, \\infty) دارای تعداد متناهی صفر باشد:',
          latex:
            '\\{t_1, t_2, \\dots, t_m\\} \\quad (t_m = \\max\\{t_i\\})',
        },
        {
          stepNumber: 2,
          stepTitle: 'ثبات علامت جواب برای t > t_m',
          explanation:
            'چون بعد از t_m دیگر هیچ صفری وجود ندارد، تابع پیوسته x(t) باید همواره مثبت یا همواره منفی بماند. بدون کاستن از کلیت فرض می‌کنیم برای تمام t > t_m داشته باشیم x(t) > 0.',
          latex:
            '\\forall t > t_m: \\quad x(t) > 0',
        },
        {
          stepNumber: 3,
          stepTitle: 'بررسی مشتق دوم و تقعر نمودار',
          explanation:
            'معادله دیفرانسیل را بازنویسی می‌کنیم:',
          latex:
            '\\ddot{x}(t) = -(t+1)x(t) < 0 \\quad (\\forall t > t_m)',
          scoringTip:
            'چون $\ddot{x} < 0$ است، نتیجه می‌شود که مشتق اول $\dot{x}(t)$ اکیداً نزولی است.',
        },
        {
          stepNumber: 4,
          stepTitle: 'اثبات منفی شدن شیب $\dot{x}(t)$',
          explanation:
            'ادعا می‌کنیم حتماً نقطه‌ای مانند t^* > t_m وجود دارد که \\dot{x}(t^*) < 0 باشد. زیرا اگر برای تمام t > t_m شیب $\dot{x}(t)$ \\ge 0 بماند، چون \\dot{x} نزولی و کراندار از پایین به صفر است، \\dot{x} به حدی L \\ge 0 میل می‌کند. اما با انتگرال‌گیری از $\ddot{x} = -(t+1)x$ داریم:',
          latex:
            '$\dot{x}(t)$ - \\dot{x}(t_m+1) = -\\int_{t_m+1}^t (s+1)x(s) ds \\le -x(t_m+1) \\int_{t_m+1}^t (s+1)ds \\to -\\infty',
        },
        {
          stepNumber: 5,
          stepTitle: 'رسیدن به تناقض آشکار با مثبت بودن x(t)',
          explanation:
            'وقتی شیب در نقطه t^* منفی شد (\\dot{x}(t^*) = -c < 0)، به دلیل تقعر رو به پایین (منحنی زیر خط مماس است):',
          latex:
            'x(t) \\le x(t^*) + \\dot{x}(t^*)(t - t^*) = x(t^*) - c(t - t^*)',
          scoringTip:
            'وقتی t \\to \\infty، سمت راست به -\\infty میل می‌کند. بنابراین x(t) حتماً در یک نقطه t > t^* صفر شده و منفی می‌شود! این با فرض x(t) > 0 برای تمام t > t_m در تناقض است. لذا فرض خلف باطل است و x(t) دارای بی‌نهایت صفر مثبت است.',
        },
      ],
    },
    gotchas: [
      {
        title: 'فراموش کردن حالت x(t) < 0',
        warning:
          'باید در آغاز استدلال بنویسید: «اگر x(t) < 0 باشد، تابع z(t) = -x(t) را در نظر می‌گیریم که در همان معادله صدق می‌کند و مثبت است»، تا داور نتواند ایراد نقص حالت بگیرد.',
        deductionReason: 'عدم پوشش حالت جواب منفی.',
      },
    ],
    twinChallenge: {
      problemTitle: 'چالش شبیه‌ساز: تبدیل معادله به فرم خودالحاق',
      problemStatement:
        'معادله دیفرانسیل t^2 \\ddot{x} + t \\dot{x} + (t^2 - n^2)x = 0 (معادله بسل) را با یافتن عامل انتگرال‌ساز به فرم خودالحاق اشتورم-لیوویل تبدیل کنید:',
      problemLatex:
        't^2 \\ddot{x} + t \\dot{x} + (t^2 - n^2)x = 0',
      solutionSteps: [
        {
          stepTitle: 'بررسی خودالحاقی اولیه',
          description:
            'a_0 = t^2 \\implies \\dot{a}_0 = 2t \\ne a_1 = t. معادله خودالحاق نیست.',
        },
        {
          stepTitle: 'محاسبه عامل خودالحاق‌کننده',
          description:
            '$\mu(t)$ = \\frac{1}{t^2} \\exp\\left( \\int \\frac{t}{t^2} dt \\right) = \\frac{1}{t^2} e^{\\ln t} = \\frac{1}{t^2} \\cdot t = \\frac{1}{t}.',
        },
        {
          stepTitle: 'ضرب در معادله و جمع‌بندی',
          description:
            '\\frac{1}{t} [t^2 \\ddot{x} + t\\dot{x}] + \\frac{t^2-n^2}{t} x = 0 \\implies t\\ddot{x} + \\dot{x} + \\left(t - \\frac{n^2}{t}\\right)x = 0.',
        },
      ],
      finalAnswer:
        '\\frac{d}{dt}[t \\dot{x}] + \\left(t - \\frac{n^2}{t}\\right) x = 0',
    },
  },

  // ==========================================
  // MODULE 7: فرمول آبل و قضایای جداسازی اشتورم
  // ==========================================
  {
    id: 'module-7',
    number: 7,
    phaseId: 3,
    phaseName: 'فاز ۳: رفتار کیفی، نوسان و اشتورم-لیوویل',
    title: 'فرمول آبل، رونسکین و قضیه جداسازی اشتورم',
    subtitle: 'اثبات فرمول آبل، رفتار تابع نسبت $R(x) = y_2/y_1$ و یک‌به‌یک بودن روی بازه ریشه‌ها',
    examScoreEstimate: '۵ نمره قطعی',
    lecturePages: 'صفحات ۳۲ تا ۳۵ جزوه',
    examRef: 'سوال ۸ نمونه‌سوالات میان‌ترم و قضیه ۳.۷ و ۳.۹ جزوه',
    prerequisiteBridge: [
      'تعریف رونسکین دو تابع: $W(y_1, y_2)$(x) = y_1 y_2\' - y_1\' y_2 = \\begin{vmatrix} y_1 & y_2 \\\\ y_1\' & y_2\' \\end{vmatrix}',
      'مشتق تابع کسری: \\left(\\frac{u}{v}\\right)\' = \\frac{u\'v - uv\'}{v^2}',
      'قضیه رول (Rolle\'s Theorem) و قضیه مقدار میانی (IVT).',
    ],
    intuition: {
      summary:
        'قضیه جداسازی اشتورم (Sturm Separation Theorem) می‌گوید اگر دو جواب مستقل خطی y_1 و y_2 از یک معادله مرتبه دوم داشته باشیم، صفرهای این دو تابع مثل دانه‌های تسبیح یکی در میان قرار می‌گیرند: بین هر دو ریشه متوالی از y_1، دقیقاً و منحصراً یک ریشه از y_2 قرار دارد! شاه‌کلید اثبات این قضیه، تابع نسبت R(x) = y_2(x) / y_1(x) است. مشتق این نسبت برابر است با -$W(y_1, y_2)$ / y_1^2. چون جواب‌ها مستقل خطی‌اند، رونسکین صفر نمی‌شود و تغییر علامت نمی‌دهد، پس مشتق همواره مثبت یا همواره منفی است (تابع اکیداً یکنوا است). در دو سر بازه ریشه‌ها مقدار نسبت از -\\infty تا +\\infty می‌رود و طبق پیوستگی باید دقیقاً در یک نقطه از محور صفر عبور کند!',
      whyItMatters:
        'سوال ۸ میان‌ترم ۳ بخش داشت: الف) عدم وجود صفر مشترک، ب) اکیداً یکنوا بودن R(x)، ج) نگاشت یک‌به‌یک R(x) از ($x_1$, x_2) به $\mathbb{R}$. این سوال تمام عیار است.',
      microCheck: {
        question:
          'مشتق تابع R(x) = \\frac{y_2(x)}{y_1(x)} بر حسب رونسکین $W(y_1, y_2)$ برابر چیست؟',
        hint: 'از مشتق کسری استفاده کنید و فرمول $W(y_1, y_2)$ = y_1 y_2\' - y_1\' y_2 را جایگزین کنید.',
        answerLatex: 'R\'(x) = \\frac{y_2\' y_1 - y_1\' y_2}{y_1^2} = \\frac{-$W(y_1, y_2)$(x)}{y_1(x)^2}',
        answerExplanation:
          'دقت کنید که y_2\' y_1 - y_1\' y_2 قرینه فرمول استاندارد رونسکین است، بنابراین یک علامت منفی ظاهر می‌شود.',
      },
    },
    formalTools: [
      {
        title: 'فرمول آبل برای معادلات اشتورم-لیوویل (قضیه ۳.۷ جزوه)',
        theoremName: 'Abel\'s Formula',
        latex: 'P(t) W(f,g)(t) = k \\quad (k = \\text{const.})',
        conditions: [
          'f و g دو جواب معادله (P(t)\\dot{x})\' + Q(t)x = 0 هستند.',
          'اگر f و g در یک نقطه صفر مشترک داشته باشند، k = 0 و توابع وابسته خطی‌اند.',
        ],
      },
      {
        title: 'قضیه جداسازی اشتورم (قضیه ۳.۹ جزوه)',
        theoremName: 'Sturm Separation Theorem',
        latex:
          'f(t_1) = f(t_2) = 0 \\implies \\exists ! t_3 \\in (t_1, t_2): \\; g(t_3) = 0',
        conditions: [
          'f و g دو جواب مستقل خطی معادله اشتورم-لیوویل هستند.',
          't_1 و t_2 دو صفر متوالی تابع f هستند.',
        ],
      },
    ],
    examWalkthrough: {
      problemStatement:
        'معادله دیفرانسیل خطی همگن y\'\' + p(x)y\' + q(x)y = 0 را در نظر بگیرید که در آن p و q پیوسته‌اند. فرض کنید y_1 و y_2 دو جواب مستقل خطی باشند:\nالف) ثابت کنید y_1 و y_2 صفر مشترک ندارند.\nب) ثابت کنید تابع R(x) = \\frac{y_2(x)}{y_1(x)} روی بازه ($x_1$, x_2) که $x_1$, x_2 ریشه‌های متوالی y_1 هستند، اکیداً یکنواست.\nج) ثابت کنید R(x) تابعی یک‌به‌یک از ($x_1$, x_2) به $\mathbb{R}$ است (عین سوال ۸ میان‌ترم).',
      problemLatex:
        'R(x) = \\frac{y_2(x)}{y_1(x)}, \\quad x \\in ($x_1$, x_2)',
      steps: [
        {
          stepNumber: 1,
          stepTitle: 'اثبات قسمت (الف): عدم وجود صفر مشترک',
          explanation:
            'به برهان خلف فرض می‌کنیم نقطه $x_0$ صفر مشترک باشد، یعنی y_1($x_0$) = 0 و y_2($x_0$) = 0. مقدار رونسکین در $x_0$:',
          latex:
            '$W(y_1, y_2)$($x_0$) = y_1($x_0$)y_2\'($x_0$) - y_1\'($x_0$)y_2($x_0$) = 0 \\cdot y_2\'($x_0$) - y_1\'($x_0$) \\cdot 0 = 0',
          scoringTip:
            'طبق فرمول آبل، چون W($x_0$) = 0 است، رونسکین در تمام بازه صفر مطلق می‌شود (W(x) \\equiv 0). اما این با فرض مستقل خطی بودن y_1 و y_2 در تناقض است! بنابراین فرض خلف باطل است و صفر مشترک ندارند.',
        },
        {
          stepNumber: 2,
          stepTitle: 'اثبات قسمت (ب): اکیداً یکنوا بودن R(x)',
          explanation:
            'چون $x_1$ و x_2 دو ریشه متوالی y_1 هستند، تابع y_1(x) در بازه باز ($x_1$, x_2) هرگز صفر نمی‌شود، پس R(x) پیوسته و مشتق‌پذیر است. مشتق می‌گیریم:',
          latex:
            'R\'(x) = \\left( \\frac{y_2(x)}{y_1(x)} \\right)\' = \\frac{y_2\'(x)y_1(x) - y_1\'(x)y_2(x)}{y_1(x)^2} = \\frac{-$W(y_1, y_2)$(x)}{y_1(x)^2}',
        },
        {
          stepNumber: 3,
          stepTitle: 'بررسی علامت مشتق و نتیجه یکنوایی اکید',
          explanation:
            'چون y_1 و y_2 مستقل خطی هستند، $W(y_1, y_2)$(x) هیچ‌گاه صفر نمی‌شود و طبق قضیه مقدار میانی علامت ثابتی دارد (یا همواره مثبت یا همواره منفی). همچنین مخرج y_1(x)^2 اکیداً مثبت است، بنابراین مشتق همواره هم‌علامت است و R(x) اکیداً یکنواست:',
          latex:
            'R\'(x) \\ne 0 \\quad (\\forall x \\in ($x_1$, x_2)) \\implies R(x) \\text{ is strictly monotonic}',
        },
        {
          stepNumber: 4,
          stepTitle: 'اثبات قسمت (ج): نگاشت یک‌به‌یک روی تمام $\mathbb{R}$',
          explanation:
            'هر تابع اکیداً یکنوا ذاتاً یک‌به‌یک (Injective) است. حالا برای اثبات اینکه برد آن تمام $\mathbb{R}$ است، حدهای دو سر بازه را حساب می‌کنیم:',
          latex:
            '\\lim_{x \\to $x_1$^+} R(x) = \\lim_{x \\to $x_1$^+} \\frac{y_2(x)}{y_1(x)}, \\quad \\lim_{x \\to x_2^-} R(x) = \\lim_{x \\to x_2^-} \\frac{y_2(x)}{y_1(x)}',
        },
        {
          stepNumber: 5,
          stepTitle: 'تحلیل حدهای بی‌نهایت با توجه به غیرصفر بودن y_2 در ریشه‌ها',
          explanation:
            'طبق قسمت (الف)، y_2($x_1$) \\ne 0 و y_2(x_2) \\ne 0 است، در حالی که مخرج‌ها به سمت صفر میل می‌کنند. چون y_1 بین دو ریشه علامت ثابتی دارد، مشتق‌های y_1\'($x_1$) و y_1\'(x_2) علامت‌های مخالف دارند:',
          latex:
            '\\lim_{x \\to $x_1$^+} R(x) = -\\infty, \\quad \\lim_{x \\to x_2^-} R(x) = +\\infty',
          scoringTip:
            'چون R(x) پیوسته است، طبق قضیه مقدار میانی (IVT) تمام مقادیر بین -\\infty تا +\\infty یعنی تمام $\mathbb{R}$ را می‌پوشاند (پوشا). پس R(x) یک نگاشت یک‌به‌یک و پوشا (بایژکشن) از ($x_1$, x_2) به $\mathbb{R}$ است.',
        },
      ],
    },
    gotchas: [
      {
        title: 'عدم ذکر تفاوت علامت مشتق‌های y_1 در دو سر بازه',
        warning:
          'باید اشاره کنید که چون y_1 بین دو ریشه متوالی نمی‌تواند علامت عوض کند، اگر در $x_1$ صعودی وارد بازه شده، در x_2 نزولی از آن خارج می‌شود، لذا حدهای R(x) در دو سر علامت مخالف دارند.',
        deductionReason: 'ناقص گذاشتن اثبات حدهای دو سر بازه.',
      },
    ],
    twinChallenge: {
      problemTitle: 'چالش شبیه‌ساز: قضیه جداسازی برای معادله نوسانگر هارمونیک',
      problemStatement:
        'برای معادله y\'\' + 4y = 0، دو جواب مستقل خطی y_1 = \\sin 2x و y_2 = \\cos 2x را در نظر بگیرید. قضیه جداسازی اشتورم را بین دو ریشه متوالی 0 و \\pi/2 از y_1 به طور ملموس نشان دهید:',
      problemLatex:
        'y_1 = \\sin 2x, \\quad y_2 = \\cos 2x, \\quad x \\in (0, \\pi/2)',
      solutionSteps: [
        {
          stepTitle: 'ریشه‌های متوالی y_1',
          description:
            '\\sin 2x = 0 \\implies 2x = 0, \\pi \\implies $x_1$ = 0, \\; x_2 = \\pi/2.',
        },
        {
          stepTitle: 'محاسبه ریشه y_2 در این بازه',
          description:
            '\\cos 2x = 0 \\implies 2x = \\pi/2 \\implies x = \\pi/4. نقطه \\pi/4 دقیقاً درون بازه (0, \\pi/2) قرار دارد!',
        },
        {
          stepTitle: 'بررسی تابع نسبت',
          description:
            'R(x) = \\frac{\\cos 2x}{\\sin 2x} = \\cot 2x. مشتق آن R\'(x) = -2(1+\\cot^2 2x) < 0 (اکیداً نزولی). حدهای دو سر: \\lim_{x \\to 0^+} \\cot 2x = +\\infty و \\lim_{x \\to \\pi/2^-} \\cot 2x = -\\infty.',
        },
      ],
      finalAnswer: 'تنها ریشه y_2 در این بازه x = \\pi/4 است که درستی قضیه را تأیید می‌کند.',
    },
  },
];

export const SAFETY_NET_THEOREMS: SafetyNetTheorem[] = [
  {
    id: 'safety-1',
    title: 'تناهی بودن تعداد صفرهای جواب غیربدیهی در بازه فشرده (قضیه ۳.۶ جزوه)',
    pageRef: 'صفحات ۳۱ و ۳۲ جزوه',
    statement:
      'فرض کنید f یک جواب غیربدیهی از معادله اشتورم-لیوویل (P(t)\\dot{x})\' + Q(t)x = 0 روی بازه فشرده I = [a, b] باشد. آنگاه f در این بازه نمی‌تواند دارای تعداد نامتناهی صفر باشد (تعداد صفرها حتماً متناهی است).',
    statementLatex:
      'f(t) \\ne 0 \\implies \\text{card}\\{t \\in [a, b] \\mid f(t) = 0\\} < \\infty',
    proofSteps: [
      {
        stepTitle: 'طرح برهان خلف و تشکیل دنباله نامتناهی از صفرها',
        explanation:
          'فرض می‌کنیم f دارای بینهایت صفر \\{t_n\\}_{n=1}^\\infty در بازه بسته و کراندار [a, b] باشد.',
      },
      {
        stepTitle: 'اعمال قضیه بولتزانو-وایرشتراس (Bolzano-Weierstrass)',
        explanation:
          'چون بازه [a, b] فشرده است، طبق قضیه بولتزانو-وایرشتراس هر دنباله نامتناهی دارای یک زیردنباله همگرا مانند \\tilde{t}_n است که به نقطه‌ای مانند t_0 \\in [a, b] میل می‌کند:',
        latex: '\\tilde{t}_n \\to t_0 \\quad (n \\to \\infty), \\quad \\tilde{t}_n \\ne t_0',
      },
      {
        stepTitle: 'بررسی مقدار تابع در نقطه حدی با پیوستگی',
        explanation:
          'چون f پیوسته است: f(t_0) = \\lim_{n \\to \\infty} f(\\tilde{t}_n) = \\lim 0 = 0.',
        latex: 'f(t_0) = 0',
      },
      {
        stepTitle: 'محاسبه مشتق در نقطه حدی از تعریف مشتق',
        explanation:
          'چون f مشتق‌پذیر است، مشتق آن در t_0 برابر است با:',
        latex:
          '\\dot{f}(t_0) = \\lim_{\\tilde{t}_n \\to t_0} \\frac{f(\\tilde{t}_n) - f(t_0)}{\\tilde{t}_n - t_0} = \\lim \\frac{0 - 0}{\\tilde{t}_n - t_0} = 0',
      },
      {
        stepTitle: 'تناقض با قضیه یکتایی',
        explanation:
          'در نقطه t_0 هر دو شرط f(t_0) = 0 و \\dot{f}(t_0) = 0 برقرارند. طبق قضیه وجود و یکتایی، جواب معادله دیفرانسیل خطی با شرایط اولیه صفر، منحصراً جواب صفر مطلق f(t) \\equiv 0 است. این با فرض غیربدیهی بودن f در تناقض است! پس تعداد صفرها متناهی است.',
      },
    ],
    examTip:
      'استاد به ذکر صریح نام «قضیه بولتزانو-وایرشتراس» و نوشتن حد تعریف مشتق \\frac{f(\\tilde{t}_n) - f(t_0)}{\\tilde{t}_n - t_0} حساس است.',
  },
  {
    id: 'safety-2',
    title: 'همگرایی یکنواخت سری تقریب‌های پیکارد با آزمون M وایرشتراس',
    pageRef: 'صفحه ۸ جزوه',
    statement:
      'دنباله تقریب‌های متوالی پیکارد \\{y_n(x)\\} روی بازه [$x_0$ - h, $x_0$ + h] به طور یکنواخت به یک تابع پیوسته y(x) همگرا می‌شود.',
    statementLatex:
      'y_n(x) = y_0 + \\sum_{i=1}^n (y_i(x) - y_{i-1}(x)) \\; \\xrightarrow{\\text{uniform}} \\; y(x)',
    proofSteps: [
      {
        stepTitle: 'تبدیل دنباله به سری تلسکوپی تفاضل‌ها',
        explanation:
          'دنباله y_n(x) را به صورت یک سری تلسکوپی بازنویسی می‌کنیم:',
        latex: 'y_n(x) = y_0 + \\sum_{i=1}^n [y_i(x) - y_{i-1}(x)]',
      },
      {
        stepTitle: 'کرانداری تفاضل جملات متوالی با استقرا',
        explanation:
          'در مرحله دوم اثبات پیکارد با استقرا نشان داده شده است که:',
        latex:
          '|y_n(x) - y_{n-1}(x)| \\le \\frac{M}{L} \\frac{L^n}{n!} |x - $x_0$|^n \\le \\frac{M}{L} \\frac{(Lh)^n}{n!} = M_n',
      },
      {
        stepTitle: 'اعمال آزمون M وایرشتراس (Weierstrass M-Test)',
        explanation:
          'سری عددی \\sum M_n همگراست، زیرا:',
        latex:
          '\\sum_{n=1}^\\infty \\frac{M}{L} \\frac{(Lh)^n}{n!} = \\frac{M}{L} (e^{Lh} - 1) < \\infty',
      },
      {
        stepTitle: 'نتیجه‌گیری همگرایی یکنواخت',
        explanation:
          'طبق آزمون M وایرشتراس، سری توابع به طور یکنواخت به یک تابع پیوسته y(x) همگرا می‌شود که در معادله انتگرالی صدق می‌کند.',
      },
    ],
    examTip:
      'حتماً رابطه بسط عددی سری \\sum \\frac{(Lh)^n}{n!} = e^{Lh} - 1 را ذکر کنید تا ثابت شود سری کران بالا متناهی است.',
  },
  {
    id: 'safety-3',
    title: 'قضیه مقایسه اشتورم-لیوویل (شکل ضعیف - قضیه ۳.۱۰ جزوه)',
    pageRef: 'صفحات ۳۵ و ۳۶ جزوه',
    statement:
      'اگر \\phi جواب غیربدیهی \\ddot{x} + q(t)x = 0 با \\phi(a)=\\phi(b)=0 باشد و \\int_a^b (p(t) - q(t))x^2 dt \\ge 0، آنگاه جواب \\psi از \\ddot{x} + p(t)x = 0 با \\psi(a)=0، حداقل یک صفر در بازه (a, b] دارد.',
    statementLatex:
      '\\int_a^b (p - q)\\phi^2 dt \\ge 0 \\implies \\exists t_0 \\in (a, b]: \\; \\psi(t_0) = 0',
    proofSteps: [
      {
        stepTitle: 'برهان خلف: فرض عدم وجود صفر برای \\psi در (a, b]',
        explanation:
          'فرض می‌کنیم به ازای تمام t \\in (a, b] داشته باشیم $\psi(t)$ \\ne 0.',
      },
      {
        stepTitle: 'ترکیب معادلات دو تابع',
        explanation:
          'معادله اول را در \\phi و دومی را در \\frac{\\phi^2}{\\psi} ضرب کرده و کم می‌کنیم:',
        latex:
          '\\phi\\ddot{\\phi} - \\frac{\\phi^2}{\\psi}\\ddot{\\psi} = (p(t) - q(t))\\phi^2 \\implies \\frac{\\phi}{\\psi}\\frac{d}{dt}[\\dot{\\phi}\\psi - \\phi\\dot{\\psi}] = (p-q)\\phi^2',
      },
      {
        stepTitle: 'انتگرال‌گیری جزءبه‌جزء',
        explanation:
          'از طرفین از a تا b انتگرال گرفته و جزءبه‌جزء می‌زنیم. جملات مرزی صفر می‌شوند و باقی می‌ماند:',
        latex:
          '-\\int_a^b \\frac{(\\dot{\\phi}\\psi - \\phi\\dot{\\psi})^2}{\\psi^2} dt \\ge 0',
      },
      {
        stepTitle: 'تناقض',
        explanation:
          'چون عبارت زیر انتگرال مربع کامل و منفی است، تنها در صورتی نامساوی برقرار است که \\dot{\\phi}\\psi - \\phi\\dot{\\psi} = 0 \\implies \\phi = c\\psi. اما \\phi(b)=0 ولی طبق فرض \\psi(b) \\ne 0 که تناقض است!',
      },
    ],
    examTip:
      'حرکت کلیدی در این اثبات، ضرب معادله دوم در \\frac{\\phi^2}{\\psi} است که به تشکیل مربع کامل \\frac{(\\dot{\\phi}\\psi - \\phi\\dot{\\psi})^2}{\\psi^2} منتهی می‌شود.',
  },
];
