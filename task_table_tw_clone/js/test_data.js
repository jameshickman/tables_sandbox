const build_text_span = (t) => {
    const el_span = document.createElement('span');
    el_span.innerText = t;
    return el_span;
}

const test_data = [
    {
        "uid": "a0e9fdcb-8473-4d7d-b37a-b47169d27d1d",
        "name": "Row 1",
        "cells": [
            build_text_span("Lorem ipsum dolor sit amet, consectetur adipiscing elit."),
            build_text_span("In non hendrerit erat. Fusce facilisis tellus eget nisi efficitur pellentesque."),
            build_text_span("Integer ac posuere sem."),
            build_text_span("Nullam magna nunc, dignissim ut auctor ac, tristique non lectus."),
            build_text_span("Vestibulum fringilla ante facilisis urna aliquam, eget pharetra sapien commodo."),
            build_text_span("Morbi nec porttitor turpis, sit amet dapibus arcu. Cras eget justo eu dui vestibulum placerat. Duis faucibus arcu sit amet volutpat tempus.")
        ]
    },
    {
        "uid": "316a8bd2-a644-4ea5-9633-ebfcde406dd3",
        "name": "Row 2",
        "cells": [
            document.createElement('span').innerText = "Donec id condimentum sapien, eget faucibus nibh. Morbi blandit lectus sagittis malesuada vestibulum.",
            document.createElement('span').innerText = "Duis purus diam, porta a eros vitae, commodo aliquam est.",
            document.createElement('span').innerText = "Suspendisse interdum fringilla sapien efficitur ullamcorper.",
            document.createElement('span').innerText = "Cras eget tellus sit amet enim efficitur consectetur.",
            document.createElement('span').innerText = "Aenean egestas sem non ex varius, ut eleifend risus condimentum.",
            document.createElement('span').innerText = "Ut non sapien quis ante dapibus condimentum. Proin tempus in massa sed tristique. "
        ],
        "expanded": true,
        "children": [
            {
                "uid": "6957d727-c3ed-421c-ae46-ee195ae09231",
                "name": "Row 3",
                "cells": [
                    document.createElement('span').innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    document.createElement('span').innerText = "In non hendrerit erat. Fusce facilisis tellus eget nisi efficitur pellentesque.",
                    document.createElement('span').innerText = "Integer ac posuere sem.",
                    document.createElement('span').innerText = "Nullam magna nunc, dignissim ut auctor ac, tristique non lectus.",
                    document.createElement('span').innerText = "Vestibulum fringilla ante facilisis urna aliquam, eget pharetra sapien commodo.",
                    document.createElement('span').innerText = "Morbi nec porttitor turpis, sit amet dapibus arcu."
                ],
                "expanded": false,
                "children": [
                    {
                        "uid": "e5ba7176-45dd-43cc-a239-0b4455d9a39e",
                        "name": "Row 4",
                        "cells": [
                            document.createElement('span').innerText = "Cras eget tellus sit amet enim efficitur consectetur.",
                            document.createElement('span').innerText = "Aenean egestas sem non ex varius, ut eleifend risus condimentum.",
                            document.createElement('span').innerText = "Ut non sapien quis ante dapibus condimentum.",
                            document.createElement('span').innerText = "Proin tempus in massa sed tristique.",
                            document.createElement('span').innerText = "Morbi gravida, nisl et vehicula semper, orci eros dignissim metus, et congue ipsum nulla id libero.",
                            document.createElement('span').innerText = "Sed vel enim purus."
                        ]
                    }
                ]
            },
            {
                "uid": "eb609c77-cc70-4e5a-9e0c-7039513a1ecd",
                "name": "Row 5",
                "cells": [
                    document.createElement('span').innerText = "Cras eget justo eu dui vestibulum placerat.",
                    document.createElement('span').innerText = "Duis faucibus arcu sit amet volutpat tempus.",
                    document.createElement('span').innerText = "Donec id condimentum sapien, eget faucibus nibh.",
                    document.createElement('span').innerText = "Morbi blandit lectus sagittis malesuada vestibulum.",
                    document.createElement('span').innerText = "Duis purus diam, porta a eros vitae, commodo aliquam est.",
                    document.createElement('span').innerText = "Suspendisse interdum fringilla sapien efficitur ullamcorper."
                ]
            }
        ]
    },
    {
        "uid": "a39d8db2-133c-4918-a2d5-970d4040fff0",
        "name": "Row 6",
        "cells": [
            document.createElement('span').innerText = "Morbi gravida, nisl et vehicula semper, orci eros dignissim metus, et congue ipsum nulla id libero.",
            document.createElement('span').innerText = "Sed vel enim purus. Nam bibendum pretium fermentum. Praesent non egestas erat. Integer viverra auctor posuere.",
            document.createElement('span').innerText = "Nam vulputate nec est eget vulputate. Phasellus at vestibulum ante.",
            document.createElement('span').innerText = "Praesent auctor nulla id molestie facilisis. Fusce pretium elit a justo tempus, id vehicula nisl pharetra.",
            document.createElement('span').innerText = "Phasellus a tortor vel dui ultrices ullamcorper sed quis lectus.",
            document.createElement('span').innerText = ""
        ]
    },
    {
        "uid": "dca408f2-7d22-452c-9900-d5d364ce863c",
        "name": "Row 7",
        "cells": [
            document.createElement('span').innerText = "Morbi feugiat dui diam, vulputate pulvinar risus cursus non.",
            document.createElement('span').innerText = "Fusce et imperdiet metus.",
            document.createElement('span').innerText = "Quisque sed sodales dui, a aliquet augue. Nullam congue ex ac mauris maximus, pharetra elementum est hendrerit.",
            document.createElement('span').innerText = "Aenean sit amet blandit tellus.",
            document.createElement('span').innerText = "Suspendisse nulla augue, pharetra ac arcu vel, bibendum malesuada odio.",
            document.createElement('span').innerText = "Nunc eget viverra nulla. Integer est lacus, congue non mauris vel, sollicitudin tempor felis."
        ]
    },
    {
        "uid": "2101eb4d-9575-4d25-bcfd-add379b738b6",
        "name": "Row 8",
        "cells": [
            document.createElement('span').innerText = "Phasellus sodales neque id quam pretium, eget sodales risus vehicula.",
            document.createElement('span').innerText = "Etiam et nibh augue.",
            document.createElement('span').innerText = "Aenean a sem eget magna ullamcorper pulvinar sed non diam.",
            document.createElement('span').innerText = "Cras tristique purus eget arcu scelerisque, vel posuere ex tempor.",
            document.createElement('span').innerText = "Ut venenatis libero eget risus porta, ut bibendum turpis aliquet.",
            document.createElement('span').innerText = "Donec justo ex, iaculis in sodales at, ultrices nec tortor."
        ]
    }
];