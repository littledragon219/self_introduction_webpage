"use client"

import { useEffect, useRef, useState } from "react"
import * as d3 from "d3"
import { motion, AnimatePresence } from "framer-motion"
import { X, Mail, Phone, MessageCircle, MapPin } from "lucide-react"
import { getGraphData } from "@/lib/sanity"

interface Node {
  id: string
  label: string
  type: "center" | "synapse"
  level: number
  parentId?: string
  content?: any
  x?: number
  y?: number
  fx?: number
  fy?: number
}

interface Link {
  source: string | Node
  target: string | Node
}

interface GraphData {
  nodes: Node[]
  links: Link[]
}

export default function CognitiveSynapseGraph() {
  const svgRef = useRef<SVGSVGElement>(null)
  const [data, setData] = useState<GraphData | null>(null)
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(["center"]))
  const [selectedContent, setSelectedContent] = useState<any>(null)
  const [showIntro, setShowIntro] = useState(true)
  const [showContact, setShowContact] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const graphData = await getGraphData()
        const hasData =
          graphData.synapseNodes.length > 0 || graphData.projects.length > 0 || graphData.experiences.length > 0

        if (hasData) {
          const processedData = processDataForGraph(graphData)
          setData(processedData)
        } else {
          setData(getStaticData())
        }
        setLoading(false)
      } catch (error) {
        console.error("Failed to load graph data:", error)
        setData(getStaticData())
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    if (!data || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = window.innerWidth
    const height = window.innerHeight

    svg.selectAll("*").remove()

    // Add gradient definitions
    const defs = svg.append("defs")

    const gradient = defs
      .append("linearGradient")
      .attr("id", "nodeGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "100%")

    gradient.append("stop").attr("offset", "0%").attr("stop-color", "#667eea")
    gradient.append("stop").attr("offset", "100%").attr("stop-color", "#764ba2")

    const centerGradient = defs
      .append("radialGradient")
      .attr("id", "centerGradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%")

    centerGradient.append("stop").attr("offset", "0%").attr("stop-color", "#ff6b6b")
    centerGradient.append("stop").attr("offset", "100%").attr("stop-color", "#ee5a24")

    // Add link gradient
    const linkGradient = defs
      .append("linearGradient")
      .attr("id", "linkGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%")

    linkGradient.append("stop").attr("offset", "0%").attr("stop-color", "#4ecdc4").attr("stop-opacity", 0.8)
    linkGradient.append("stop").attr("offset", "100%").attr("stop-color", "#44a08d").attr("stop-opacity", 0.8)

    // Add glow effect
    const filter = defs.append("filter").attr("id", "glow")
    filter.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "coloredBlur")
    const feMerge = filter.append("feMerge")
    feMerge.append("feMergeNode").attr("in", "coloredBlur")
    feMerge.append("feMergeNode").attr("in", "SourceGraphic")

    const linkGroup = svg.append("g").attr("class", "links")
    const nodeGroup = svg.append("g").attr("class", "nodes")

    const simulation = d3
      .forceSimulation<Node>()
      .force(
        "link",
        d3
          .forceLink<Node, Link>()
          .id((d) => d.id)
          .distance(150),
      )
      .force("charge", d3.forceManyBody().strength(-400))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(40))

    const updateGraph = () => {
      const visibleNodes = getVisibleNodes()
      const visibleLinks = getVisibleLinks(visibleNodes)

      // Update links
      const link = linkGroup.selectAll("line").data(visibleLinks)
      link.exit().remove()

      const linkEnter = link
        .enter()
        .append("line")
        .attr("stroke", "url(#linkGradient)")
        .attr("stroke-width", 3)
        .attr("opacity", 0)
        .attr("stroke-dasharray", "5,5")

      linkEnter.transition().duration(800).attr("opacity", 0.7)

      // Update nodes
      const node = nodeGroup.selectAll("g").data(visibleNodes)
      node.exit().transition().duration(500).attr("transform", "scale(0)").remove()

      const nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", "scale(0)")
        .style("cursor", "pointer")

      nodeEnter
        .append("circle")
        .attr("r", (d) => (d.type === "center" ? 35 : 20))
        .attr("fill", (d) => (d.type === "center" ? "url(#centerGradient)" : "url(#nodeGradient)"))
        .attr("stroke", "#ffffff")
        .attr("stroke-width", 3)
        .attr("filter", "url(#glow)")

      nodeEnter
        .append("text")
        .attr("text-anchor", "middle")
        .attr("dy", ".35em")
        .attr("fill", "#ffffff")
        .attr("font-size", (d) => (d.type === "center" ? "14px" : "11px"))
        .attr("font-weight", "700")
        .attr("text-shadow", "1px 1px 2px rgba(0,0,0,0.5)")
        .text((d) => (d.label.length > 10 ? d.label.substring(0, 10) + "..." : d.label))

      nodeEnter
        .transition()
        .duration(800)
        .delay((d, i) => i * 100)
        .attr("transform", "scale(1)")

      const allNodes = nodeEnter.merge(node)

      allNodes
        .on("mouseenter", (event, d) => {
          d3.select(event.currentTarget).transition().duration(300).attr("transform", "scale(1.2)")
        })
        .on("mouseleave", (event, d) => {
          d3.select(event.currentTarget).transition().duration(300).attr("transform", "scale(1)")
        })
        .on("click", (event, d) => {
          event.stopPropagation()
          handleNodeClick(d)
        })

      simulation.nodes(visibleNodes)
      simulation.force("link")?.links(visibleLinks)
      simulation.alpha(0.5).restart()

      simulation.on("tick", () => {
        linkGroup
          .selectAll("line")
          .attr("x1", (d: any) => d.source.x)
          .attr("y1", (d: any) => d.source.y)
          .attr("x2", (d: any) => d.target.x)
          .attr("y2", (d: any) => d.target.y)

        nodeGroup.selectAll("g").attr("transform", (d: any) => `translate(${d.x},${d.y})`)
      })
    }

    const getVisibleNodes = () => {
      return data.nodes.filter((node) => node.type === "center" || expandedNodes.has(node.parentId || ""))
    }

    const getVisibleLinks = (visibleNodes: Node[]) => {
      return data.links.filter((link) => {
        const sourceId = typeof link.source === "object" ? link.source.id : link.source
        const targetId = typeof link.target === "object" ? link.target.id : link.target
        return visibleNodes.some((n) => n.id === sourceId) && visibleNodes.some((n) => n.id === targetId)
      })
    }

    const handleNodeClick = (node: Node) => {
      if (node.type === "center") {
        setShowIntro(false)
        setShowContact(true)
        expandFirstLevel()
      } else if (node.content) {
        setSelectedContent(node.content)
      } else if (!expandedNodes.has(node.id)) {
        setExpandedNodes((prev) => new Set([...prev, node.id]))
      }
    }

    const expandFirstLevel = () => {
      const firstLevelNodes = data.nodes.filter((n) => n.level === 1)
      setExpandedNodes((prev) => {
        const newSet = new Set(prev)
        firstLevelNodes.forEach((node) => newSet.add(node.id))
        return newSet
      })
    }

    updateGraph()

    const handleResize = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight
      svg.attr("width", newWidth).attr("height", newHeight)
      simulation.force("center", d3.forceCenter(newWidth / 2, newHeight / 2))
      simulation.alpha(0.3).restart()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [data, expandedNodes])

  if (loading) {
    return (
      <div className="text-center text-white/70 pointer-events-none">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-primary mx-auto mb-4"></div>
        <p className="text-lg">正在加载认知突触网络...</p>
      </div>
    )
  }

  return (
    <>
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        className={`absolute inset-0 transition-all duration-500 ${selectedContent ? "blur-sm scale-95" : ""}`}
      />

      {/* Floating particles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent-secondary/30 rounded-full"
            animate={{
              x: [0, typeof window !== "undefined" ? window.innerWidth : 1920],
              y: [
                Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1080),
                Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1080),
              ],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              left: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1920),
              top: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 1080),
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center text-white/80 pointer-events-none z-10"
          >
            <motion.h1
              className="text-4xl font-header font-bold text-white mb-4"
              animate={{
                textShadow: [
                  "0 0 20px rgba(255,107,107,0.5)",
                  "0 0 30px rgba(255,107,107,0.8)",
                  "0 0 20px rgba(255,107,107,0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              曾德荣 认知突触
            </motion.h1>
            <motion.p
              className="text-xl mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              身心合一的智造者 | 思想蓝图的建筑师
            </motion.p>
            <motion.p
              className="text-lg text-accent-secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              点击中心节点，探索我的认知网络
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContact && !selectedContent && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-8 bg-dark-card/90 backdrop-blur-md rounded-2xl p-6 text-white z-20 border border-accent-primary/30"
          >
            <h3 className="text-lg font-semibold mb-4 text-accent-primary">联系方式</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent-secondary" />
                <span>+86-15609276162</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent-secondary" />
                <span>+60-1113085149</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-accent-secondary" />
                <span>chinweng219@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-accent-secondary" />
                <span>微信：derongchin</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-accent-secondary" />
                <span>西安交通大学</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-30 p-4"
            onClick={() => setSelectedContent(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: -90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 90 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-dark-card/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-4xl w-full p-8 border border-accent-primary/30 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-header font-bold text-white">
                  {selectedContent.title || selectedContent.projectTitle || selectedContent.experienceTitle}
                </h2>
                <button
                  onClick={() => setSelectedContent(null)}
                  className="text-white/50 hover:text-accent-primary transition-colors p-2 hover:bg-accent-primary/10 rounded-full"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {selectedContent.role && (
                <div className="text-accent-primary font-semibold mb-4 text-lg">{selectedContent.role}</div>
              )}

              {selectedContent.category && (
                <div className="text-accent-secondary font-semibold mb-4 text-lg">{selectedContent.category}</div>
              )}

              {selectedContent.period && (
                <div className="text-accent-tertiary font-medium mb-4">{selectedContent.period}</div>
              )}

              <p className="text-white/90 mb-6 text-lg leading-relaxed">
                {selectedContent.description || selectedContent.projectSummary}
              </p>

              {selectedContent.techStack && (
                <div className="flex flex-wrap gap-3 mb-6">
                  {selectedContent.techStack.map((tech: string, index: number) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-accent-primary/20 to-accent-secondary/20 text-accent-primary rounded-full text-sm font-medium border border-accent-primary/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="space-y-4">
                {selectedContent.challenge && (
                  <div className="bg-dark-surface/50 rounded-xl p-4 border-l-4 border-accent-primary">
                    <strong className="text-accent-primary text-lg">挑战与背景:</strong>
                    <p className="text-white/80 mt-2">{selectedContent.challenge}</p>
                  </div>
                )}
                {selectedContent.solution && (
                  <div className="bg-dark-surface/50 rounded-xl p-4 border-l-4 border-accent-secondary">
                    <strong className="text-accent-secondary text-lg">解决方案与过程:</strong>
                    <p className="text-white/80 mt-2">{selectedContent.solution}</p>
                  </div>
                )}
                {selectedContent.results && (
                  <div className="bg-dark-surface/50 rounded-xl p-4 border-l-4 border-accent-tertiary">
                    <strong className="text-accent-tertiary text-lg">成果与反思:</strong>
                    <p className="text-white/80 mt-2">{selectedContent.results}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function processDataForGraph(data: any): GraphData {
  const { synapseNodes, projects, experiences } = data
  const nodes: Node[] = []
  const links: Link[] = []

  const centerNode: Node = {
    id: "center",
    label: "曾德荣",
    type: "center",
    level: 0,
  }
  nodes.push(centerNode)

  const contentMap: { [key: string]: any } = {}
  projects.forEach((project: any) => {
    contentMap[project._id] = {
      type: "project",
      ...project,
    }
  })
  experiences.forEach((experience: any) => {
    contentMap[experience._id] = {
      type: "experience",
      ...experience,
    }
  })

  const nodeMap: { [key: string]: Node } = {}
  synapseNodes.forEach((node: any) => {
    const processedNode: Node = {
      id: node._id,
      label: node.label,
      type: "synapse",
      level: node.level || 1,
      parentId: node.parentNode?._id || "center",
      content: node.linkedContent ? contentMap[node.linkedContent._id] : null,
    }
    nodes.push(processedNode)
    nodeMap[node._id] = processedNode
  })

  nodes.forEach((node) => {
    if (node.parentId && node.parentId !== "center") {
      const parent = nodeMap[node.parentId]
      if (parent) {
        links.push({
          source: node.parentId,
          target: node.id,
        })
      }
    } else if (node.type === "synapse" && node.level === 1) {
      links.push({
        source: "center",
        target: node.id,
      })
    }
  })

  return { nodes, links }
}

function getStaticData(): GraphData {
  return {
    nodes: [
      { id: "center", label: "曾德荣", type: "center", level: 0 },
      { id: "research", label: "科研项目", type: "synapse", level: 1, parentId: "center" },
      { id: "competition", label: "赛事经历", type: "synapse", level: 1, parentId: "center" },
      { id: "work", label: "工作经历", type: "synapse", level: 1, parentId: "center" },
      { id: "skills", label: "核心技能", type: "synapse", level: 1, parentId: "center" },

      // 科研项目
      {
        id: "smart-arm",
        label: "智能无损抓取机械臂",
        type: "synapse",
        level: 2,
        parentId: "research",
        content: {
          projectTitle: "智能无损抓取机械臂",
          role: "项目负责人（智能算法开发设计）",
          period: "2024.05 – 至今",
          description:
            "研发触觉感知-柔性控制-特征迁移三位一体系统，配合树莓派主控与舵机协同，开发动态闭环力控算法实时感知物体，以0.01N的力控分辨率实现精准控制达到智能无损抓取。算法上突破性设计层级化原型网络，实现水果类型域分类和成熟度子域分类。零样本推理+少样本微调双模式，使系统无需重训练即可识别新水果，克服了传统算法换果即重构的泛化难题。",
          techStack: ["力控算法", "原型网络", "零样本推理", "树莓派", "ROS", "Python"],
          challenge:
            "传统工业机械臂通常用于刚性物体，在面对水果等易损、形态不一的物体时，极易造成损伤，泛化能力差。如何让机械臂像人手一样，既心中有数（知道抓的是什么），又手下有谱（知道用多大力）？当出现一种全新的水果时，如何避免重新训练整个模型的巨大成本，实现快速适应？",
          solution:
            "感知层：搭建了包含力控传感器的硬件系统，配合树莓派主控，开发动态闭环力控算法，实时感知物体形变。决策层：设计了创新的层级化原型网络，它包含两级分类：第一级进行域分类（如苹果、橘子），第二级在域内进行子域分类（如成熟、未成熟）。泛化层：结合零样本推理和少样本微调双模式。对于新水果，系统可直接进行零样本识别；若需更高精度，只需提供少量样本微调即可，极大提升了泛化能力和效率。",
          results:
            "力控分辨率达到0.01N，实现了对多种水果的智能、无损抓取。在2025年大学生创新大赛校赛中荣获银奖。这次经历让我深刻体会到，一个成功的智能产品，是算法、硬件和用户场景的深度耦合。作为项目负责人，我不仅要设计算法，更要思考成本、可用性和未来的扩展性，这正是我对AI产品经理角色的初步探索。",
        },
      },
      {
        id: "wind-diagnosis",
        label: "风力发电机故障诊断",
        type: "synapse",
        level: 2,
        parentId: "research",
        content: {
          projectTitle: "风力发电机故障诊断与寿命预测",
          role: "深度学习算法开发设计",
          period: "2024.10-2024.11",
          description:
            "基于风力发电机的振动信号大数据集，采用了自注意力机制、LSTM算法对时序数据进行特征提取和异常检测。对其进行分析后，通过SARIMA模型和最大似然MLE估计模型对其建模与预测故障时间。",
          techStack: ["LSTM", "自注意力机制", "SARIMA", "MLE估计", "时序分析"],
          challenge: "从复杂的振动信号中准确提取故障特征并预测故障时间",
          solution: "结合自注意力机制和LSTM进行特征提取，使用SARIMA和MLE模型进行故障预测",
          results: "成功实现风力发电机故障的早期诊断和寿命预测",
        },
      },
      {
        id: "bearing-diagnosis",
        label: "旋转机械故障诊断",
        type: "synapse",
        level: 2,
        parentId: "research",
        content: {
          projectTitle: "基于深度残差学习的旋转机械故障诊断算法复现",
          role: "算法复现与优化",
          period: "2024.12-2025.01",
          description:
            "使用Case Western Reserve University轴承数据集（10类工况，四种负载），实现两个残差块堆叠的1D-CNN网络，各包含两层卷积层，通过跳跃连接直接传递输入特征，解决传统CNN的梯度退化/爆炸问题。",
          techStack: ["1D-CNN", "残差网络", "深度学习", "故障诊断"],
          challenge: "解决传统CNN在深层网络中的梯度退化和爆炸问题",
          solution: "采用残差块结构，通过跳跃连接直接传递输入特征",
          results: "成功复现算法，在轴承故障诊断中取得优异性能",
        },
      },
      {
        id: "domain-adaptation",
        label: "跨域故障诊断",
        type: "synapse",
        level: 2,
        parentId: "research",
        content: {
          projectTitle: "基于多层域适应的滚动轴承跨域故障诊断算法复现",
          role: "算法复现与验证",
          period: "2025.01-2025.02",
          description:
            "复现搭建基于1D-CNN的多层多内核MMD域适应框架，即在卷积层和全连接层中引入多内核MMD，通过最小化跨层分布差异，迫使网络学习域不变特征。进行网络结构复现设计，也进行对比实验设计与参数调优和结果验证。",
          techStack: ["1D-CNN", "MMD域适应", "多内核", "跨域学习"],
          challenge: "实现不同工况下的故障诊断泛化能力",
          solution: "采用多层多内核MMD域适应框架，学习域不变特征",
          results: "复现结果与论文准确率相差不到1.0%",
        },
      },

      // 赛事经历
      {
        id: "robot-competition",
        label: "探索者杯机器人竞赛",
        type: "synapse",
        level: 2,
        parentId: "competition",
        content: {
          experienceTitle: "2023年第六届探索者杯机器人竞赛校园行",
          category: "二等奖",
          role: "电路搭建与算法开发设计",
          period: "2023.09-2023.10",
          description:
            "组装轮式小车整个架构和电路设计，并基于arduino开发板开发了智能避障的算法。项目中使用了超声波传感器和颜色传感器融合，配合控制四个轮子的转速实现转向、上下坡，循迹移动，颜色识别完成任务等功能。",
          techStack: ["Arduino", "传感器融合", "智能避障", "电路设计"],
        },
      },
      {
        id: "dragon-dance",
        label: "舞龙舞狮锦标赛",
        type: "synapse",
        level: 2,
        parentId: "competition",
        content: {
          experienceTitle: "2024年第十六届中国大学生舞龙舞狮锦标赛",
          category: "季军",
          role: "舞龙队校队队员",
          period: "2024.07",
          description:
            "作为一名工科学生，我面临的是体能和艺术表现力的双重挑战。训练是艰苦的，包括每周数日的清晨集训和暑期的强化训练。在炎热的泉州，面对陌生的环境和迫近的赛程，团队一度陷入烦躁和失误的困境。我选择坚持，与队友们互相鼓励，在教练的指导下重整旗鼓。我们将压力转化为动力，在赛场上超常发挥，最终为学校赢得了季军的荣誉。这段经历磨练了我的意志力，更让我懂得了在高压下如何进行团队协作与情绪管理。我相信，打造一款卓越的产品，同样需要这种舞龙般的坚韧与团队精神。",
          techStack: ["团队协作", "体能训练", "传统文化", "竞技精神"],
        },
      },
      {
        id: "business-simulation",
        label: "企业运营大赛",
        type: "synapse",
        level: 2,
        parentId: "competition",
        content: {
          experienceTitle: "2025年工创大赛虚拟仿真企业运营大赛",
          category: "入围校赛决赛",
          role: "决策手",
          period: "2025.01-2025.03",
          description:
            "每队会由三名同学组成，我们是由金融、工商管理和机械工程跨专业团队。金融专业的同学负责计算成本、税率等；工商管理专业的队长则是综合性，即负责辅助计算也负责给出决策建议；我则是基于理工科思维对竞争公司的竞价、研发投入等综合预测判断，做出各季度的决策。经多轮选拔，在42队中脱颖而出进入校赛决赛。",
          techStack: ["商业分析", "决策制定", "跨专业合作", "战略规划"],
        },
      },

      // 工作经历
      {
        id: "hengsu-tech",
        label: "上海恒数科技",
        type: "synapse",
        level: 2,
        parentId: "work",
        content: {
          experienceTitle: "上海恒数科技",
          role: "项目经理助理兼系统开发",
          period: "2025.6-至今",
          description: "主要负责调研跨境电商在国内设立运营中心的方案，以及开发ERP系统等优化运营和集中管理。",
          techStack: ["ERP系统开发", "跨境电商", "项目管理", "系统优化"],
        },
      },
      {
        id: "ced-organic",
        label: "CED Organic&Food",
        type: "synapse",
        level: 2,
        parentId: "work",
        content: {
          experienceTitle: "CED Organic&Food",
          role: "人力资源部业务助理",
          period: "2022.03-2022.08",
          description:
            "主要负责货物进出货管理与货品申报工作，需与不同部门同时合作完成每天近千食品并出货给各大食品分销商。",
          techStack: ["供应链管理", "跨部门协作", "货品申报", "物流管理"],
        },
      },
      {
        id: "bee-cheng-hiang",
        label: "美珍香",
        type: "synapse",
        level: 2,
        parentId: "work",
        content: {
          experienceTitle: "Bee Cheng Hiang 美珍香",
          role: "销售助理",
          period: "2021.12-2022-02",
          description: "主要负责肉干等食品原材料的每日订购工作，也会担任门店销售员，向客户推销店内食品。",
          techStack: ["销售管理", "客户服务", "供应链协调", "零售运营"],
        },
      },

      // 核心技能
      {
        id: "ai-skills",
        label: "AI探索与应用",
        type: "synapse",
        level: 2,
        parentId: "skills",
        content: {
          experienceTitle: "AI探索与应用能力",
          description:
            "借助不断推出的大模型快速将算法开发部署与应用在项目中，并融合自身知识去解决代码报错之处、创新点挖掘等。熟练掌握深度学习、机器学习算法，具备从理论到实践的完整能力链。",
          techStack: ["深度学习", "机器学习", "大模型应用", "算法优化", "Python", "PyTorch", "TensorFlow"],
        },
      },
      {
        id: "language-skills",
        label: "多语言能力",
        type: "synapse",
        level: 2,
        parentId: "skills",
        content: {
          experienceTitle: "语言能力",
          description: "中文母语，熟练掌握英文，马来文，粤语，客家话。具备良好的国际交流能力和跨文化沟通技巧。",
          techStack: ["中文", "英文", "马来文", "粤语", "客家话"],
        },
      },
      {
        id: "leadership-skills",
        label: "领导能力",
        type: "synapse",
        level: 2,
        parentId: "skills",
        content: {
          experienceTitle: "领导能力",
          description:
            "机械留2201班班长，国际学生联合会优秀团员，西交大舞龙舞狮协会部长与学生教练。在大学生创新大赛担任核心人员和项目负责人，小组作业几乎都是担任队长。",
          techStack: ["团队管理", "项目领导", "组织协调", "学生工作"],
        },
      },
      {
        id: "volunteer-spirit",
        label: "志愿服务精神",
        type: "synapse",
        level: 2,
        parentId: "skills",
        content: {
          experienceTitle: "志愿服务精神",
          description:
            "参与了校内外大小型活动包括校内舞团大赛队长、中马教师教育论坛队长、领事馆官方活动等。具备强烈的社会责任感和服务意识。",
          techStack: ["活动组织", "跨文化交流", "社会服务", "公共关系"],
        },
      },
    ],
    links: [
      { source: "center", target: "research" },
      { source: "center", target: "competition" },
      { source: "center", target: "work" },
      { source: "center", target: "skills" },

      { source: "research", target: "smart-arm" },
      { source: "research", target: "wind-diagnosis" },
      { source: "research", target: "bearing-diagnosis" },
      { source: "research", target: "domain-adaptation" },

      { source: "competition", target: "robot-competition" },
      { source: "competition", target: "dragon-dance" },
      { source: "competition", target: "business-simulation" },

      { source: "work", target: "hengsu-tech" },
      { source: "work", target: "ced-organic" },
      { source: "work", target: "bee-cheng-hiang" },

      { source: "skills", target: "ai-skills" },
      { source: "skills", target: "language-skills" },
      { source: "skills", target: "leadership-skills" },
      { source: "skills", target: "volunteer-spirit" },
    ],
  }
}
