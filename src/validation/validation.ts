/* validators */

type RuleType = 'name' | 'email' | 'phone' | 'required'

export type MessageConfig = {[K in keyof PropConfig]: string}

type RuleConfig = {
  rule: RuleType,
  message: string
}

type PropConfig = {
  [prop: string]: RuleConfig[]
}

interface ValidatorConfig {
  [target: string]: PropConfig
}

const validators: ValidatorConfig = {}

/* decorator functions */

const Name = addRule('name')
const Email = addRule('email')
const Phone = addRule('phone')
const Required = addRule('required')

function validateMessages(target: any): MessageConfig | undefined {
  let messages: ReturnType<typeof validateMessages>
  const targetValidator = validators[target.constructor.name]
  Object.keys(targetValidator).forEach(prop => {
    targetValidator[prop].forEach(ruleConfig => {
      if (!messages?.[prop]) {
        let propIsValid = true
        if (ruleConfig.rule === 'name') {
          const re = /^[a-zA-ZЁёА-я -]*$/
          propIsValid = re.test(String(target.state[prop]))
        }
        if (ruleConfig.rule === 'email') {
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          propIsValid = re.test(String(target.state[prop]).toLowerCase())
        }
        if (ruleConfig.rule === 'phone') {
          const re = /\+?\d([()-]?\d){10}/
          propIsValid = re.test(String(target.state[prop]))
        }
        if (ruleConfig.rule === 'required') {
          propIsValid = !!target.state[prop]
        }
        if (!propIsValid) messages = { ...messages, [prop]: ruleConfig.message }
      }
    })
  })
  return messages
}

function addRule(rule: RuleType) {
  return function(prop: string, message: string) {
    return function(target: any, _: string) {
      target = target.constructor.name
      const ruleConfig = { rule, message }
      const propConfig = validators[target]?.[prop]?.filter(ruleConfig => ruleConfig.rule !== rule) || []
      propConfig.push(ruleConfig)
      validators[target] = {
        ...validators[target],
        [prop]: propConfig
      }
    }
  }
}

export {
  Name,
  Email,
  Phone,
  Required,
  validateMessages
}
