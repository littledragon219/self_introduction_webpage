import { createClient } from "@sanity/client"

// Check if Sanity is properly configured
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const isConfigured = projectId && projectId !== "your-project-id"

export const sanityClient = isConfigured
  ? createClient({
      projectId: projectId!,
      dataset: "production",
      apiVersion: "2024-03-11",
      useCdn: false,
    })
  : null

export const getGraphData = async () => {
  // If Sanity is not configured, return empty data to trigger fallback
  if (!sanityClient) {
    console.log("Sanity not configured, using static data")
    return {
      synapseNodes: [],
      projects: [],
      experiences: [],
    }
  }

  try {
    const [synapseNodes, projects, experiences] = await Promise.all([
      sanityClient.fetch(`*[_type == "synapseNode"]{
        _id,
        label,
        level,
        parentNode->{_id, label},
        linkedContent->{
          _type,
          _id,
          title,
          projectTitle,
          experienceTitle
        }
      }`),
      sanityClient.fetch(`*[_type == "project"]{
        _id,
        projectTitle,
        role,
        projectSummary,
        challenge,
        solution,
        results,
        coverMedia,
        techStack,
        relatedLinks
      }`),
      sanityClient.fetch(`*[_type == "experience"]{
        _id,
        experienceTitle,
        category,
        description,
        relatedImages
      }`),
    ])

    return {
      synapseNodes,
      projects,
      experiences,
    }
  } catch (error) {
    console.error("Failed to fetch graph data:", error)
    return {
      synapseNodes: [],
      projects: [],
      experiences: [],
    }
  }
}

export const getExperiences = async () => {
  if (!sanityClient) {
    return getStaticExperiences()
  }

  const query = `*[_type == "experience"]{
    _id,
    title,
    category,
    description
  }`
  try {
    const experiences = await sanityClient.fetch(query)
    return experiences.length > 0 ? experiences : getStaticExperiences()
  } catch (error) {
    console.error("Failed to fetch experiences:", error)
    return getStaticExperiences()
  }
}

export const getProjects = async () => {
  if (!sanityClient) {
    return getStaticProjects()
  }

  const query = `*[_type == "project"]{
    _id,
    title,
    role,
    description
  }`
  try {
    const projects = await sanityClient.fetch(query)
    return projects.length > 0 ? projects : getStaticProjects()
  } catch (error) {
    console.error("Failed to fetch projects:", error)
    return getStaticProjects()
  }
}

export const getPosts = async () => {
  if (!sanityClient) {
    return getStaticPosts()
  }

  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    publishedAt,
    summary
  }`
  try {
    const posts = await sanityClient.fetch(query)
    return posts.length > 0 ? posts : getStaticPosts()
  } catch (error) {
    console.error("Failed to fetch posts:", error)
    return getStaticPosts()
  }
}

// Static fallback data with updated content
function getStaticExperiences() {
  return [
    {
      _id: "exp1",
      title: "智能无损抓取机械臂",
      category: "科研项目负责人",
      description:
        "研发触觉感知-柔性控制-特征迁移三位一体系统，配合树莓派主控与舵机协同，开发动态闭环力控算法实时感知物体，以0.01N的力控分辨率实现精准控制达到智能无损抓取。",
    },
    {
      _id: "exp2",
      title: "2024年第十六届中国大学生舞龙舞狮锦标赛",
      category: "季军获得者",
      description:
        "平日坚持每周三天早上6点30分训练，暑假训练强度提高到每周五天各4小时。在赛场上超常发挥，通过团队协作与默契配合，勇夺季军。",
    },
    {
      _id: "exp3",
      title: "上海恒数科技",
      category: "项目经理助理兼系统开发",
      description: "主要负责调研跨境电商在国内设立运营中心的方案，以及开发ERP系统等优化运营和集中管理。",
    },
  ]
}

function getStaticProjects() {
  return [
    {
      _id: "proj1",
      title: "智能无损抓取机械臂",
      role: "项目负责人（智能算法开发设计）",
      description:
        "研发三位一体系统，配合树莓派与舵机，开发动态闭环力控算法，实现对不同尺寸和材质物体的智能无损抓取。在2025年大学生创新大赛校赛获得银奖。",
    },
    {
      _id: "proj2",
      title: "风力发电机故障诊断与寿命预测",
      role: "深度学习算法开发设计",
      description: "基于风力发电机的振动信号大数据集，采用自注意力机制、LSTM算法对时序数据进行特征提取和异常检测。",
    },
    {
      _id: "proj3",
      title: "基于深度残差学习的旋转机械故障诊断算法",
      role: "算法复现与优化",
      description:
        "使用Case Western Reserve University轴承数据集，实现两个残差块堆叠的1D-CNN网络，解决传统CNN的梯度退化/爆炸问题。",
    },
  ]
}

function getStaticPosts() {
  return [
    {
      _id: "post1",
      title: "深度学习在机械故障诊断中的应用与思考",
      publishedAt: "2024-12-15",
      summary: "探讨深度学习技术在旋转机械故障诊断领域的最新进展，分析残差网络和域适应技术的应用前景。",
    },
    {
      _id: "post2",
      title: "从舞龙舞狮到智能制造：传统与现代的融合",
      publishedAt: "2024-11-20",
      summary: "通过舞龙舞狮的训练体验，思考传统文化中的团队协作精神如何应用到现代智能制造项目管理中。",
    },
    {
      _id: "post3",
      title: "跨境电商ERP系统开发实践",
      publishedAt: "2024-10-10",
      summary: "分享在上海恒数科技实习期间，参与跨境电商ERP系统开发的技术实践和业务思考。",
    },
  ]
}
