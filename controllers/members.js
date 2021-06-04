const fs = require('fs')
const data = require('../data.json')
const { age, date } = require('../utils')

exports.index = (request, response) => {
    return response.render('members/index', { members: data.members })
}

exports.show = (request, response) => {
    const { id } = request.params

    const foundMember = data.members.find((member) => member.id == id)

    if(!foundMember) return response.send('Member not found')

    const member = {
        ...foundMember,
        age: age(foundMember.birth),
    }

    return response.render('members/show', { member })
}

exports.create = (request, response) => {
    return response.render('members/create')
}

exports.post = (request, response) => {
        const keys = Object.keys(request.body)
    
        for(key of keys) {
            if (request.body[key] == '')
                return response.send('Please, fill all fields')
        }

        birth = Date.parse(request.body.birth)

        let id = 1
        const lastMember = data.members[data.members.length - 1]

        if(lastMember) {
            id = lastMember.id + 1
        }


        data.members.push({
            id,
            ...request.body,
            birth
        })

        fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
            if (err) return response.send('Write file error!')

            return response.redirect('/members')
        })

}

exports.edit = (request, response) => {
    const { id } = request.params

    const foundMember = data.members.find((member) => member.id == id)

    if(!foundMember) return response.send('Member not found')
    
    const member = {
        ...foundMember,
        birth: date(foundMember.birth)
    }
    
    return response.render('members/edit', { member })
}

exports.put = (request, response) => {
    const { id } = request.body
    let index = 0

    const foundMember = data.members.find((member, foundIndex) => {
        if (member.id == id) {
            index = foundIndex
            return true
        }
    })

    if(!foundMember) return response.send('Member not found')

    const member = {
        ...foundMember,
        ...request.body,
        birth: Date.parse(request.body.birth),
        id: Number(request.body.id)
    }

    data.members[index] = member

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return response.send('Write error!')
        
        return response.redirect(`/members/${id}`)
    })

}

exports.delete = (request, response) => {
    const { id } = request.body

    const filteredMembers = data.members.filter((member) => member.id != id)


    data.members = filteredMembers

    fs.writeFile('data.json', JSON.stringify(data, null, 2), (err) => {
        if (err) return response.send('Write file error')

        return response.redirect('/members')
    })
}